"use client";

import { useEffect, useRef } from "react";

const STAGGER_MS = 80;
const MAX_STAGGER_STEPS = 5;

function settle(element: HTMLElement) {
  delete element.dataset.revealActive;
  element.style.removeProperty("--reveal-delay");
}

// Only elements still below the fold are hidden, after hydration: the server HTML, a visit
// without JavaScript and a section hydrated while already on screen all render visible.
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (element) => element.getBoundingClientRect().top > window.innerHeight,
    );
    if (targets.length === 0) {
      return;
    }

    const onTransitionEnd = (event: TransitionEvent) => {
      const element = event.currentTarget as HTMLElement;
      if (event.target === element) {
        settle(element);
        element.removeEventListener("transitionend", onTransitionEnd);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        visible.forEach((entry, index) => {
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          const delay = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS;
          element.style.setProperty("--reveal-delay", `${delay}ms`);
          element.addEventListener("transitionend", onTransitionEnd);
          element.dataset.revealActive = "";
          delete element.dataset.revealPending;
        });
      },
      { rootMargin: "0px" },
    );

    for (const element of targets) {
      element.dataset.revealPending = "";
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      for (const element of targets) {
        delete element.dataset.revealPending;
        element.removeEventListener("transitionend", onTransitionEnd);
        settle(element);
      }
    };
  }, []);

  return ref;
}

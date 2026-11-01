export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "data-theme";

export const THEME_COLORS: Record<Theme, string> = {
  light: "#FFFFFF",
  dark: "#0B0F17",
};

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode, cookie settings): the choice then lasts for the visit.
  }
}

export function resolveTheme(): Theme {
  const current = document.documentElement.dataset.theme;
  if (isTheme(current)) {
    return current;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.setAttribute("content", THEME_COLORS[theme]);
  }
}

// Runs before hydration as an inline script, so it cannot import this module: it is built from
// the same constants to stay in sync with applyTheme.
export const THEME_INIT_SCRIPT = `(function () {
  var theme = null;
  try { theme = localStorage.getItem('${THEME_STORAGE_KEY}'); } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
  var color = theme === 'dark' ? '${THEME_COLORS.dark}' : '${THEME_COLORS.light}';
  document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
    meta.setAttribute('content', color);
  });
})()`;

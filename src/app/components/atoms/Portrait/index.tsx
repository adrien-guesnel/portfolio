import type { ImageProps } from "next/image";

import ThemeImage from "@components/atoms/ThemeImage";
import PortraitDark from "@public/img/portrait-dark.webp";
import PortraitLight from "@public/img/portrait-light.webp";

type PortraitProps = Omit<ImageProps, "src" | "preload" | "loading">;

export default function Portrait(props: PortraitProps) {
  return <ThemeImage srcLight={PortraitLight} srcDark={PortraitDark} {...props} />;
}

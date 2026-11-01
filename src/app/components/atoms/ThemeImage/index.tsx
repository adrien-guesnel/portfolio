import clsx from "clsx";
import Image, { type ImageProps, type StaticImageData } from "next/image";

type ThemeImageProps = Omit<ImageProps, "src" | "preload" | "loading"> & {
  srcLight: StaticImageData;
  srcDark: StaticImageData;
};

// Both images stay lazy so the browser only downloads the one the active theme displays.
export default function ThemeImage({
  srcLight,
  srcDark,
  className,
  alt,
  ...rest
}: ThemeImageProps) {
  return (
    <>
      <Image {...rest} alt={alt} src={srcLight} className={clsx(className, "theme-only-light")} />
      <Image {...rest} alt={alt} src={srcDark} className={clsx(className, "theme-only-dark")} />
    </>
  );
}

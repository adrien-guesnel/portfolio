import clsx from "clsx";
import Image, { type StaticImageData } from "next/image";

interface HeroMockupProps {
  className?: string;
  image: StaticImageData;
  alt?: string;
}

export default function AppMockup({ className, image, alt }: HeroMockupProps) {
  return (
    <div
      className={clsx(
        "relative rounded-2xl w-full border border-white/10 shadow-md overflow-hidden",
        className,
      )}
    >
      <div className="absolute flex items-center gap-2 top-4 left-5 z-10">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
      </div>
      <Image
        src={image}
        alt={alt ?? "Profil"}
        fill
        className="object-cover object-[50%_25%]"
        priority
      />
    </div>
  );
}

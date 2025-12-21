import type { ReactNode } from "react";

// These tags are available
type Tag = "primary" | "lightGradient";

type Props = {
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode;
};

export default function RichText({ children }: Props) {
  return (
    <div className="prose">
      {children({
        primary: (chunks: ReactNode) => <span className="text-primary">{chunks}</span>,
        lightGradient: (chunks: ReactNode) => (
          <span className="bg-linear-to-r from-[#3A7DE8] via-[#788cf3] to-[#B97FEB] bg-clip-text text-transparent">
            {chunks}
          </span>
        ),
      })}
    </div>
  );
}

import type { ReactNode } from "react";

// These tags are available
type Tag = "primary";

type Props = {
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode;
};

export default function RichText({ children }: Props) {
  return (
    <div className="prose">
      {children({
        primary: (chunks: ReactNode) => <span className="text-primary">{chunks}</span>,
      })}
    </div>
  );
}

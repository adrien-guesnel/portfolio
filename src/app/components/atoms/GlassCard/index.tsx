import clsx from "clsx";

export function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-box border border-base-200/70 bg-base-100/60 p-6 text-base-content backdrop-blur-xl shadow-lg shadow-base-content/10 transition-transform duration-300 hover:-translate-y-1 dark:border-base-300/20 dark:bg-base-100/10 dark:shadow-xl dark:shadow-black/50",
        className,
      )}
    >
      {children}
    </div>
  );
}

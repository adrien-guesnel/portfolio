import clsx from "clsx";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-box border border-base-300 bg-base-200/70 p-6 transition-transform duration-300 hover:-translate-y-1 ",
        className,
      )}
    >
      {children}
    </div>
  );
}

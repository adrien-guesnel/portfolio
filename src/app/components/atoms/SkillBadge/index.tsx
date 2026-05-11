import clsx from "clsx";

export default function SkillBadge({
  skill,
  className,
  ...props
}: {
  skill: string;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "rounded-full border border-base-content/20 bg-base-200 px-4 py-2 text-sm font-semibold text-base-content",
        className,
      )}
      {...props}
    >
      {skill}
    </span>
  );
}

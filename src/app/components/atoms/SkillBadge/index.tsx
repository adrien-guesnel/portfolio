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
        "rounded-full border border-base-300 bg-base-100/50 px-4 py-2 text-sm font-semibold text-gray",
        className,
      )}
      {...props}
    >
      {skill}
    </span>
  );
}

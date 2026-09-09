interface AdUnitProps {
  slotId?: string;
  className?: string;
  label?: string;
}

/**
 * AdSense placeholder with reserved min-height to prevent CLS.
 * Swap inner content for real adsbygoogle markup after approval.
 */
export default function AdUnit({
  slotId = "ad-unit",
  className = "",
  label = "Google AdSense",
}: AdUnitProps) {
  return (
    <aside
      data-ad-slot={slotId}
      className={`flex min-h-[100px] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-zinc-300 bg-zinc-100 text-center ${className}`}
      aria-label="Advertisement"
    >
      <span className="px-3 text-xs font-medium tracking-wide text-zinc-500 sm:text-sm">
        {label}
      </span>
    </aside>
  );
}

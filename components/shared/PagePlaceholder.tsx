import { getNavItemByPath } from "@/lib/navigation";
import { Badge } from "@/components/ui/badge";

interface PagePlaceholderProps {
  pathname: string;
  title?: string;
  description?: string;
}

export function PagePlaceholder({
  pathname,
  title,
  description,
}: PagePlaceholderProps) {
  const item = getNavItemByPath(pathname);
  const displayTitle = title || item?.label || "Feature Workspace";
  const displayDescription =
    description ||
    item?.description ||
    "This functionality will be implemented in a later phase.";

  const Icon = item?.icon;

  return (
    <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-[#121214] border border-white/10 rounded-2xl shadow-xl font-poppins">
      <div className="w-16 h-16 rounded-2xl bg-[#18181B] border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00] mb-5 shadow-lg">
        {Icon ? <Icon className="w-8 h-8" /> : null}
      </div>

      <Badge variant="orange" className="mb-4">
        {item?.href.split("/")[1]?.toUpperCase() || "PHASE 1"}
      </Badge>

      <h2 className="text-2xl sm:text-3xl font-bold font-poppins text-white mb-3">
        {displayTitle}
      </h2>

      <p className="text-sm sm:text-base text-[#A1A1AA] max-w-md leading-relaxed">
        {displayDescription}
      </p>
    </div>
  );
}

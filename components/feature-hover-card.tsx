import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureHoverCardProps {
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
}

export function FeatureHoverCard({
  title,
  description,
  icon: Icon,
  className,
}: FeatureHoverCardProps) {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col py-10 lg:border-r lg:border-b hover:bg-gradient-to-t from-primary/20 to-transparent",
        className,
      )}
    >
      <div className="relative z-10 mb-4 px-10">
        <Icon size={24} className="text-primary" />
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary" />
        <span className="inline-block">{title}</span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

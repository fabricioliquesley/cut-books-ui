import { cn } from "@/lib/utils";
import { FilePlus2 } from "lucide-react";

type VariantType = "primary" | "icon";

interface DropAreaProps {
  variant?: VariantType;
}

const variants: Record<VariantType, string> = {
  primary: "h-[140px] w-[320px] flex-col gap-4 rounded-lg",
  icon: "h-14 w-14 rounded-full",
};

export function DropArea({ variant = "primary" }: DropAreaProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center border-2 border-neutral-500 bg-neutral-400 transition-all hover:ring-4 hover:ring-white/20",
        variants[variant],
      )}
    >
      <FilePlus2 size={32} />
      {variant === "primary" && <p>Select your file</p>}
      <input
        type="file"
        className="absolute h-full w-full bg-red-500 opacity-0"
      />
    </div>
  );
}

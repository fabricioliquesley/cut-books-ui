import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "w-full cursor-pointer rounded-lg bg-white p-2 font-bold text-sky-800 brightness-75 transition-all hover:brightness-100",
        className,
      )}
    >
      {children}
    </button>
  );
}

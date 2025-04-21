import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border-2 border-neutral-500 p-2 text-neutral-300 outline-0 transition-all focus:border-neutral-400 focus:ring-4 focus:ring-white/20"
    />
  );
}

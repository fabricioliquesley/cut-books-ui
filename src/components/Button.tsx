import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full cursor-pointer rounded-lg bg-white p-2 font-bold text-sky-800 brightness-75 transition-all hover:brightness-100"
    >
      {children}
    </button>
  );
}

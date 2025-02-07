import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded ${
        variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
      } ${className}`}
      {...props}
    />
  );
}

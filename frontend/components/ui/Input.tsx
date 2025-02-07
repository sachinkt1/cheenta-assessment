import * as React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 
                  text-gray-900 dark:text-white placeholder-gray-500 
                  dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none 
                  ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input"; // Ensure correct display name

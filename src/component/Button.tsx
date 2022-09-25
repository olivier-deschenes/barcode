import * as React from "react";
export function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  return (
    <button
      className={`p-2 text-sm bg-slate-200 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-700 transition-all ${
        className ?? ""
      }`}
      {...props}
    />
  );
}

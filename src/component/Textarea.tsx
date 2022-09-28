import * as React from "react";
export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>): React.ReactElement {
  return (
    <textarea
      className={`placeholder-slate-500 dark:bg-slate-900 p-3 bg-slate-100 rounded-md focus:outline-slate-300 outline-none border dark:border-slate-800 dark:focus:border-slate-700 ring-0 focus-visible:outline-none caret-black dark:caret-slate-300 text-black dark:text-slate-300 ${
        className ?? ""
      }`}
      {...props}
    />
  );
}

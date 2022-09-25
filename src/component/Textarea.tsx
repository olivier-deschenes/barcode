import * as React from "react";
export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>): React.ReactElement {
  return (
    <textarea
      className={`dark:bg-slate-800 p-3 bg-slate-200 focus:outline-slate-300 outline-none border dark:border-slate-800 dark:focus:border-slate-700 ring-0 focus-visible:outline-none dark:caret-slate-300 dark:text-slate-300 ${
        className ?? ""
      }`}
      {...props}
    />
  );
}

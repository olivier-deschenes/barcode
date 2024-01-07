import * as React from "react";
export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>): React.ReactElement {
  return (
    <textarea
      className={`rounded-md border bg-slate-100 p-3 text-black placeholder-slate-500 caret-black outline-none ring-0 focus:outline-slate-300 focus-visible:outline-none ${
        className ?? ""
      }`}
      {...props}
    />
  );
}

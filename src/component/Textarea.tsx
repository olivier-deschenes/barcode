import * as React from "react";
type Props = {};
export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={
        "rounded-md border border-slate-300 bg-slate-100" + " " + className
      }
      {...props}
    />
  );
}

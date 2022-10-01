import * as React from "react";
export function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  return <button className={`btn ${className ?? ""}`} {...props} />;
}

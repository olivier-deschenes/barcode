import * as React from "react";
import { useMemo } from "react";

type Level = "info" | "success" | "warning" | "error";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  level?: Level;
};

export function Button({
  className,
  level,
  ...props
}: Props): React.ReactElement {
  const classes = useMemo(() => {
    const classeList = [
      "p-2 text-sm rounded-md font-bold transition-all disabled:bg-slate-400 disabled:hover:bg-slate-400",
    ];

    switch (level) {
      case "success": {
        classeList.push("border-emerald-300 bg-emerald-100 text-emerald-900");
        break;
      }
      case "info": {
        classeList.push("border-blue-300 bg-blue-100 text-blue-900");
        break;
      }
      case "error": {
        classeList.push(
          "border-red-300 bg-red-100 text-red-900 hover:bg-red-200"
        );
        break;
      }
      case "warning": {
        classeList.push("border-yellow-300 bg-yellow-100 text-yellow-900");
        break;
      }
      default: {
        classeList.push("bg-emerald-600 text-white hover:bg-emerald-700 ");
        break;
      }
    }

    if (className) classeList.push(className);

    return classeList.join(" ");
  }, [className, level]);

  return <button className={`${classes} ${className ?? ""}`} {...props} />;
}

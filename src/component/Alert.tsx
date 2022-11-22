import {
  faInfoCircle,
  faCheckCircle,
  faExclamationCircle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useMemo } from "react";

type Level = "info" | "success" | "warning" | "error";

interface Props {
  level: Level;
}
export function Alert({
  level,
  children,
}: React.PropsWithChildren<Props>): React.ReactElement {
  const classes = useMemo(() => {
    switch (level) {
      case "success":
        return "border-emerald-300 bg-emerald-100 text-emerald-900";
      case "info":
        return "border-blue-300 bg-blue-100 text-blue-900";
      case "error":
        return "border-red-300 bg-red-100 text-red-900";
      case "warning":
        return "border-yellow-300 bg-yellow-100 text-yellow-900";
    }
  }, [level]);

  const icon = useMemo(() => {
    switch (level) {
      case "success":
        return faCheckCircle;
      case "info":
        return faInfoCircle;
      case "error":
        return faExclamationCircle;
      case "warning":
        return faQuestionCircle;
    }
  }, [level]);

  return (
    <div className={"flex gap-2 rounded-md border p-1.5 text-sm " + classes}>
      <div className={"flex items-center"}>
        <FontAwesomeIcon icon={icon} fixedWidth />
      </div>
      <div className={"flex items-center"}>
        <span className={"leading-none"}>{children}</span>
      </div>
    </div>
  );
}

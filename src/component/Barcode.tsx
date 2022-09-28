import JsBarcode from "jsbarcode";
import { useEffect } from "react";
import { BarecodeType } from "../App";

interface Props {
  code: BarecodeType;
  id: string;
  selftRemove: () => void;
}

export function Barcode({ code, id, selftRemove }: Props): React.ReactElement {
  useEffect(() => {
    JsBarcode(`#${id}`, code.code, {
      background: "transparent",
      displayValue: false,
    });
  }, [code, id]);

  return (
    <div className={"barcode"} onClick={selftRemove}>
      <div className={"flex flex-col items-center"}>
        <div className={"flex"}>
          <svg id={id} className={"barcode-svg break-inside-avoid"} />
        </div>
        <div className={"flex"}>
          <span className={"text-black font-mono dark:text-white"}>
            {code.label}
          </span>
        </div>
      </div>
    </div>
  );
}

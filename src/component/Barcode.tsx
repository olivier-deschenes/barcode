import JsBarcode from "jsbarcode";
import { useEffect } from "react";
import { BarecodeType } from "../types/global";

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
    <div className={"barcode group"} title={code.id}>
      <div className={"flex flex-col items-center"}>
        <div className={"flex"}>
          <svg
            id={id}
            onClick={selftRemove}
            className={"barcode-svg break-inside-avoid"}
          />
        </div>
        <div className={"flex"}>
          <span
            className={"font-mono text-black dark:text-white"}
            contentEditable
            suppressContentEditableWarning={true}
          >
            {code.label}
          </span>
        </div>
      </div>
    </div>
  );
}

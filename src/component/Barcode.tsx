import JsBarcode from "jsbarcode";
import { useEffect } from "react";
import { BarecodeType } from "../types/global";

interface Props {
  code: BarecodeType;
  id: string;
  selftRemove?: () => void;
  options?: JsBarcode.Options;
}

export function Barcode({
  code,
  id,
  selftRemove,
  options,
}: Props): React.ReactElement {
  useEffect(() => {
    JsBarcode(`#${id}`, code.code, {
      background: "transparent",
      displayValue: false,
      ...options,
    });
  }, [code, id, options]);

  if (!code) return <></>;

  return (
    <div className={"barcode group"} title={code.id} data-code={code.code}>
      <div className={"flex flex-col items-center"}>
        <div className={"flex"}>
          <svg
            id={id}
            onClick={selftRemove}
            className={"barcode-svg break-inside-avoid"}
          />
        </div>
        {code.label ? (
          <div className={"flex"}>
            <span
              className={"font-mono text-black dark:text-white"}
              contentEditable
              suppressContentEditableWarning={true}
            >
              {code.label}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

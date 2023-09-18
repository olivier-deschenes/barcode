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
    try {
      JsBarcode(`#${id}`, code.code, {
        background: "transparent",
        displayValue: false,
        ...options,
      });
    } catch (e) {
      console.error(e);
      selftRemove?.();
      alert(`Error: ${typeof e === "string" ? e : "unknown"}`);
    }
  }, [code, id, options, selftRemove]);

  if (!code) return <></>;

  return (
    <div className={`barcode-container`} title={code.id} data-code={code.code}>
      <div className={"barcode flex flex-col items-center justify-center"}>
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
              spellCheck={false}
            >
              {code.label}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

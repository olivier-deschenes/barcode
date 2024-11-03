import JsBarcode from "jsbarcode";
import { useEffect } from "react";
import { BarecodeType } from "../types/global";

interface Props {
  code: BarecodeType;
  selfRemove?: () => void;
  options?: JsBarcode.Options;
  showBarcodeCode: boolean;
}

export function Barcode({
  code,
  selfRemove,
  options,
  showBarcodeCode,
}: Props): React.ReactElement {
  const id = "id" + code.id.replaceAll("-", "");

  useEffect(() => {
    try {
      JsBarcode(`#${id}`, code.code, {
        background: "transparent",
        displayValue: showBarcodeCode,
        ...options,
      });
    } catch (e) {
      console.error(e);
      selfRemove?.();
    }
  }, [code, id, options, selfRemove]);

  if (!code) return <></>;

  return (
    <div className={`barcode-container`} title={code.id} data-code={code.code}>
      <div className={"barcode flex flex-col items-center justify-center"}>
        <div className={"flex"}>
          <svg
            id={id}
            onClick={selfRemove}
            className={"barcode-svg break-inside-avoid"}
          />
        </div>
        {code.label ? (
          <div className={"flex"}>
            <span
              className={"font-mono text-black"}
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

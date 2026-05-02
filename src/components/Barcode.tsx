import JsBarcode from "jsbarcode";
import { useEffect } from "react";
import { BarecodeType } from "../types/global";
import { usePostHog } from "@posthog/react";

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
  const posthog = usePostHog();
  const id = "id" + code.id.replaceAll("-", "");

  useEffect(() => {
    try {
      JsBarcode(`#${id}`, code.code, {
        background: "#ffffff",
        lineColor: "#000000",
        displayValue: showBarcodeCode,
        ...options,
      });
    } catch (e) {
      console.error(e);
      posthog.captureException(e, { code });
      selfRemove?.();
    }
  }, [code, id, options, selfRemove]);

  if (!code) return <></>;

  const handleRemove = (): void => {
    posthog.capture("barcode_removed", {
      code,
    });
    selfRemove?.();
  };

  return (
    <div className={`barcode-container`} title={code.id} data-code={code.code}>
      <div className={"barcode flex flex-col items-center justify-center"}>
        <div className={"flex"}>
          <svg
            id={id}
            onClick={handleRemove}
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

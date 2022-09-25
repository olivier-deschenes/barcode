import JsBarcode from "jsbarcode";
import { useEffect } from "react";

interface Props {
  code: string;
  id: string;
  selftRemove: () => void;
}

export function Barcode({ code, id, selftRemove }: Props): React.ReactElement {
  useEffect(() => {
    JsBarcode(`#${id}`, code, {
      background: "transparent",
      displayValue: false,
    });
  }, [code, id]);

  return (
    <div
      className={
        "barcode flex m-5 flex-1 justify-center basis-1/3 break-after-all h-[10rem] relative"
      }
      onClick={selftRemove}
    >
      <div className={"flex flex-col items-center"}>
        <div className={"flex"}>
          <svg id={id} className={"barcode-svg break-inside-avoid"} />
        </div>
        <div className={"flex"}>
          <span className={"text-black font-mono dark:text-slate-100"}>
            {code}
          </span>
        </div>
      </div>
    </div>
  );
}

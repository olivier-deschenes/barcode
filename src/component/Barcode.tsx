import JsBarcode from "jsbarcode";
import { useEffect } from "react";

type Props = {
  code: string;
  id: string;
};

export function Barcode({ code, id }: Props) {
  useEffect(() => {
    JsBarcode(`#${id}`, code, {
      background: "transparent",
    });
  }, []);

  return (
    <div
      className={
        "barcode flex m-5 flex-1 justify-center basis-1/3 break-after-all relative"
      }
    >
      <div>
        <svg id={id} className={"break-inside-avoid"} />
      </div>
    </div>
  );
}

import React, { forwardRef, useEffect, useRef } from "react";
import { ActionType, BarecodeType, maxBarcodePerPage } from "../App";
import { Barcode } from "./Barcode";
interface Props {
  index: number;
  barcodes: BarecodeType[];
  activePageIndex: number;
  dispatch: React.Dispatch<ActionType>;
}
export const BarcodesPage = ({
  index,
  barcodes,
  activePageIndex,
  dispatch,
}: Props): React.ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref?.current || activePageIndex !== index) return;

    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [activePageIndex, index, ref]);

  return (
    <div key={`barcode_page_${index}`} className={"barcodes-page-container"}>
      <div
        ref={ref}
        className={`barcodes-page ${
          activePageIndex === index ? "--active" : ""
        } ${barcodes.length === 0 ? "--empty" : ""}`}
        onClick={() => dispatch({ type: "change_active_page", data: index })}
      >
        {barcodes.slice(0, maxBarcodePerPage).map((code, codeIndex) => {
          const key = `code_${codeIndex}`;

          return (
            <Barcode
              key={key}
              id={key}
              code={code}
              selftRemove={() =>
                dispatch({
                  type: "remove_code",
                  data: { pageIndex: index, codeIndex },
                })
              }
            />
          );
        })}
      </div>
    </div>
  );
};

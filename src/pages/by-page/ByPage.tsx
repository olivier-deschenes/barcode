import React, {
  Reducer,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { BarcodesPage } from "../../components/BarcodesPage";
import { Textarea } from "../../components/Textarea";
import { StateType, ActionType } from "./action";
import { KeyDownEvent } from "../../types/event";
import { encodeBarcodes } from "../../utils/formatting";
import { reducer, getInitialData } from "./reducer";
import { Trans } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../components/ui/button";

export function ByPage(): React.ReactElement {
  const [inputValue, setInputValue] = useState<string>("");
  const [{ data, activePageIndex, showBarcodeCode }, dispatch] = useReducer<
    Reducer<StateType, ActionType>
  >(reducer, getInitialData());

  const inputBarcodesCount = useMemo(
    () => inputValue.split("\n").length,
    [inputValue]
  );

  const barcodesCount = useMemo(
    () => data.reduce((acc, page) => page.barcodes.length + acc, 0),
    [data]
  );

  useEffect(() => {
    document.addEventListener("keydown", handlePageKeyDown);

    return () => {
      document.removeEventListener("keydown", handlePageKeyDown);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("data", encodeBarcodes(data));
  }, [data]);

  const generateCodes = useMemo(() => {
    return data.map((page, pageIndex) => (
      <BarcodesPage
        forceScrollIntoView={activePageIndex === pageIndex}
        activePageIndex={activePageIndex}
        barcodes={page.barcodes}
        key={pageIndex}
        dispatch={dispatch}
        index={pageIndex}
        showBarcodeCode={showBarcodeCode}
      />
    ));
  }, [activePageIndex, data, showBarcodeCode]);

  const handleAddCode = (): void => {
    const newCodes = inputValue
      .split("\n")
      .filter((code) => code.trim() !== "");

    newCodes.forEach((code) => {
      dispatch({ type: "add_code", data: code });
    });

    setInputValue("");
  };

  const handleTextKeyDown = (
    event: KeyDownEvent<HTMLTextAreaElement>
  ): void => {
    if (event.key !== "Enter" || event.shiftKey) return;

    event.preventDefault();
    handleAddCode();
  };

  const handlePageKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key !== "+" || !ev.shiftKey) return;

    ev.preventDefault();
    dispatch({ type: "add_page", data: null });
  };

  const handleReset = (): void => {
    dispatch({ type: "CLEAR", data: null });
  };
  return (
    <div className="app-container flex w-screen justify-between print:p-0">
      <div
        className={
          "input-container flex h-screen w-1/3 flex-col justify-center p-5 print:hidden"
        }
      >
        <div
          className={
            "ml-auto flex w-[80%] flex-col gap-2.5 rounded bg-white pt-5 pb-2.5 [&>*]:px-5"
          }
        >
          <div className={"group relative flex"}>
            <Textarea
              value={inputValue}
              onChange={({ target }) => setInputValue(target.value)}
              onKeyDown={handleTextKeyDown}
              className={"h-[15rem] w-full rounded"}
            />
            <span
              className={
                "placeholder-text pointer-events-none absolute m-3 text-slate-500 group-focus-within:hidden " +
                (inputValue.trim() !== "" ? "hidden" : "")
              }
            >
              <Trans i18nKey={"tips.addBarcode"}>
                Press <kbd>Shift</kbd> + <kbd>Enter</kbd> to create multiple
                barcodes.
              </Trans>
            </span>
          </div>
          <div
            className={
              "flex h-10 items-center justify-between gap-2 rounded-b-md "
            }
          >
            {barcodesCount > 0 ? (
              <Button
                onClick={handleReset}
                className={
                  "h-6 rounded bg-background p-1 text-foreground hover:bg-background/70"
                }
              >
                <Trans i18nKey={"buttons.resetPages"}>
                  Reset <FontAwesomeIcon icon={faXmark} fixedWidth />
                </Trans>
              </Button>
            ) : null}
            <div className={"ml-auto text-sm"}>
              <Trans
                i18nKey={"tips.enterToAddBarcode"}
                count={inputBarcodesCount}
              >
                Press <kbd>Enter</kbd> to add the barcode.
              </Trans>
            </div>
          </div>
        </div>
      </div>
      <div
        className={"pages-container flex w-2/3 justify-center print:w-screen"}
      >
        <div className={"barcode-pages-container"}>{generateCodes}</div>
      </div>
      <div className={"absolute bottom-0 m-4 rounded bg-white p-2.5"}>
        <div className={"flex gap-1.5"}>
          <input
            type="checkbox"
            id="show_code"
            checked={showBarcodeCode}
            onChange={() =>
              dispatch({ type: "toggle_show_barcode_code", data: null })
            }
          />
          <label htmlFor="show_code">Show Barcode Code</label>
        </div>
      </div>
    </div>
  );
}

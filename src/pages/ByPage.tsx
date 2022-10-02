// @flow
import React, {
  Reducer,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { maxBarcodePerPage } from "../App";
import { BarcodesPage } from "../component/BarcodesPage";
import { Button } from "../component/Button";
import { Textarea } from "../component/Textarea";
import { StateType, ActionType } from "../types/action";
import { KeyDownEvent } from "../types/event";
import { BarecodeType } from "../types/global";
import { reducer, getInitialData } from "../utils/reducer";

export function ByPage(): React.ReactElement {
  const [inputValue, setInputValue] = useState<string>("");
  const [{ data, activePageIndex }, dispatch] = useReducer<
    Reducer<StateType, ActionType>
  >(reducer, getInitialData());

  useEffect(() => {
    document.addEventListener("keydown", handlePageKeyDown);

    return () => {
      document.removeEventListener("keydown", handlePageKeyDown);
    };
  }, []);

  useEffect(() => {
    let latestBarcodes = data.reduce<BarecodeType[]>(
      (acc, curr) => [...acc, ...curr.barcodes],
      []
    );

    latestBarcodes = latestBarcodes.slice(
      Math.max(latestBarcodes.length - maxBarcodePerPage, 0)
    );
    window.localStorage.setItem("data", JSON.stringify(latestBarcodes));
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
      />
    ));
  }, [activePageIndex, data]);

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
    <div className="app-container flex w-screen justify-between bg-slate-200 dark:bg-slate-900 print:p-0">
      <div
        className={
          "input-container flex h-screen w-1/3 flex-col justify-center p-5 print:hidden"
        }
      >
        <div
          className={
            "ml-auto flex w-[80%] flex-col rounded-md bg-white pt-5 dark:bg-slate-800 [&>*]:px-5"
          }
        >
          <div className={"pb-3.5 dark:pb-0"}>
            <Textarea
              value={inputValue}
              onChange={({ target }) => setInputValue(target.value)}
              onKeyDown={handleTextKeyDown}
              className={"h-[15rem] w-full"}
              placeholder="Enter codes here"
            />
          </div>
          <div
            className={"flex rounded-b-md bg-slate-50 py-3.5 dark:bg-slate-800"}
          >
            <div className={"flex"}>
              <Button onClick={handleReset}>Reset Pages</Button>
            </div>
            <div className={"ml-auto flex"}>
              <Button
                onClick={handleAddCode}
                disabled={inputValue.trim() === ""}
              >
                Add barcode(s)
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={"pages-container flex w-2/3 justify-center print:w-screen"}
      >
        <div className={"barcode-pages-container"}>{generateCodes}</div>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState, useReducer, Reducer } from "react";
import { BarcodesPage } from "./component/BarcodesPage";
import { Button } from "./component/Button";
import { Textarea } from "./component/Textarea";
import "./styles/app.css";
import { ActionType, StateType } from "./types/action";
import { reducer, getInitialData } from "./utils/reducer";

type KeyDownEvent<T> = React.KeyboardEvent<T>;

export const maxBarcodePerPage = 8;

function App(): React.ReactElement {
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
            <Button
              className={"ml-auto"}
              onClick={handleAddCode}
              disabled={inputValue.trim() === ""}
            >
              Add barcode(s)
            </Button>
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

export default App;

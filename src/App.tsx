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
    <div className="app-container flex justify-between bg-slate-200 dark:bg-slate-900 print:p-0 w-screen">
      <div
        className={
          "input-container flex flex-col justify-center print:hidden h-screen w-1/3 p-5"
        }
      >
        <div
          className={
            "flex ml-auto flex-col bg-white dark:bg-slate-800 pt-5 [&>*]:px-5 w-[80%] rounded-md"
          }
        >
          <div className={"pb-3.5 dark:pb-0"}>
            <Textarea
              value={inputValue}
              onChange={({ target }) => setInputValue(target.value)}
              onKeyDown={handleTextKeyDown}
              className={"w-full h-[15rem]"}
              placeholder="Enter codes here"
            />
          </div>
          <div
            className={"flex py-3.5 bg-slate-50 dark:bg-slate-800 rounded-b-md"}
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
        className={"pages-container w-2/3 print:w-screen flex justify-center"}
      >
        <div className={"barcode-pages-container"}>{generateCodes}</div>
      </div>
    </div>
  );
}

export default App;

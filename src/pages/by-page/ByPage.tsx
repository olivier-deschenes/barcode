import React, {
  Reducer,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { BarcodesPage } from "../../component/BarcodesPage";
import { Button } from "../../component/Button";
import { Textarea } from "../../component/Textarea";
import { StateType, ActionType } from "./action";
import { KeyDownEvent } from "../../types/event";
import { encodeBarcodes } from "../../utils/formatting";
import { reducer, getInitialData } from "./reducer";
import { Trans, useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function ByPage(): React.ReactElement {
  const [inputValue, setInputValue] = useState<string>("");
  const { t } = useTranslation();
  const [{ data, activePageIndex }, dispatch] = useReducer<
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
    <div className="app-container flex w-screen justify-between print:p-0">
      <div
        className={
          "input-container flex h-screen w-1/3 flex-col justify-center p-5 print:hidden"
        }
      >
        <div
          className={
            "ml-auto flex w-[80%] flex-col gap-3.5 rounded-md bg-white pt-5 pb-2.5 dark:bg-slate-800 [&>*]:px-5"
          }
        >
          <div className={"group relative flex"}>
            <Textarea
              value={inputValue}
              onChange={({ target }) => setInputValue(target.value)}
              onKeyDown={handleTextKeyDown}
              className={"h-[15rem] w-full"}
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
          <div className={"flex justify-end gap-2 rounded-b-md"}>
            {barcodesCount > 0 ? (
              <Button onClick={handleReset} level="error">
                <FontAwesomeIcon icon={faXmark} fixedWidth />
              </Button>
            ) : null}
            <Button onClick={handleAddCode} disabled={inputValue.trim() === ""}>
              {t("buttons.addBarcode", { count: inputBarcodesCount })}
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

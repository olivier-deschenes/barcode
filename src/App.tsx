import {
  useEffect,
  useMemo,
  useState,
  useReducer,
  Reducer,
  createRef,
} from "react";
import { Barcode } from "./component/Barcode";
import { BarcodesPage } from "./component/BarcodesPage";
import { Button } from "./component/Button";
import { Textarea } from "./component/Textarea";
import "./styles/app.css";

type KeyDownEvent<T> = React.KeyboardEvent<T>;

export type ActionType =
  | {
      type: "add_code";
      data: string;
    }
  | {
      type: "remove_code";
      data: { pageIndex: number; codeIndex: number };
    }
  | {
      type: "remove_page";
      data: number;
    }
  | {
      type: "add_page";
      data: null;
    }
  | {
      type: "change_active_page";
      data: number;
    };

export interface BarecodeType {
  code: string;
  label: string;
}

export interface PageType {
  ref: React.RefObject<HTMLDivElement>;
  barcodes: BarecodeType[];
}

interface StateType {
  data: PageType[];
  activePageIndex: number;
}

export const maxBarcodePerPage = 8;

function reducer(
  state: StateType,
  { type, data: actionData }: ActionType
): StateType {
  console.log({ type, actionData });
  switch (type) {
    case "add_code": {
      if (!actionData) return state;

      const newBarcode = {
        code: actionData,
        label: actionData,
      };

      const activePageHasSpace =
        state.data[state.activePageIndex].barcodes.length < maxBarcodePerPage;

      if (!activePageHasSpace) {
        const newPageIndex = state.data.findIndex(
          (page) => page.barcodes.length < maxBarcodePerPage
        );

        if (newPageIndex === -1) {
          return {
            ...state,
            data: [
              ...state.data,
              {
                ref: createRef(),
                barcodes: [newBarcode],
              },
            ],
          };
        } else {
          return {
            ...state,
            data: state.data.map((page, index) =>
              index === newPageIndex
                ? {
                    ...page,
                    barcodes: [...page.barcodes, newBarcode],
                  }
                : page
            ),
          };
        }
      } else {
        state.data[state.activePageIndex].barcodes.push(newBarcode);

        return {
          ...state,
          data: [...state.data],
        };
      }
    }
    case "remove_code": {
      state.data[actionData.pageIndex].barcodes.splice(actionData.codeIndex, 1);
      return {
        ...state,
        data: [...state.data],
      };
    }
    case "add_page": {
      const newPageIndex =
        state.data.push({ ref: createRef(), barcodes: [] }) - 1;

      return {
        data: [...state.data],
        activePageIndex: newPageIndex,
      };
    }
    case "remove_page": {
      state.data.splice(actionData, 1);

      return {
        ...state,
        data: [...state.data],
      };
    }
    case "change_active_page": {
      return {
        ...state,
        activePageIndex: actionData,
      };
    }
    default: {
      throw new Error("Not implemented");
    }
  }
}

function getInitialData(): StateType {
  /* const data = localStorage.getItem("data");

  if (data !== null) {
    return JSON.parse(data) as StateType;
  } */

  return {
    data: [
      {
        ref: createRef(),
        barcodes: [
          {
            code: "1234567890123",
            label: "Test1",
          },
        ],
      },
    ],
    activePageIndex: 0,
  };
}

function App(): React.ReactElement {
  const [inputValue, setInputValue] = useState<string>("");
  const [{ data, activePageIndex }, dispatch] = useReducer<
    Reducer<StateType, ActionType>
  >(reducer, getInitialData());

  useEffect(() => {
    console.log({ data });
  }, [data]);

  useEffect(() => {
    document.addEventListener("keydown", handlePageKeyDown);

    return () => {
      document.removeEventListener("keydown", handlePageKeyDown);
    };
  }, []);

  const generateCodes = useMemo(() => {
    return (
      <div className={"barcode-pages-container"}>
        {data.map((page, pageIndex) => (
          <BarcodesPage
            activePageIndex={activePageIndex}
            barcodes={page.barcodes}
            key={pageIndex}
            dispatch={dispatch}
            index={pageIndex}
          />
        ))}
      </div>
    );
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
    <div className="app-container flex justify-between bg-slate-100 dark:bg-slate-900 print:p-0 w-screen">
      <div
        className={
          "input-container flex flex-col justify-center print:hidden h-screen w-1/3 p-5"
        }
      >
        <div
          className={
            "flex ml-auto flex-col bg-white dark:bg-slate-800 p-5 rounded-md gap-2.5 w-[80%]"
          }
        >
          <div>
            <Textarea
              value={inputValue}
              onChange={({ target }) => setInputValue(target.value)}
              onKeyDown={handleTextKeyDown}
              className={"w-full h-[15rem]"}
              placeholder="Enter codes here"
            />
          </div>
          <div className={"flex"}>
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
        {generateCodes}
      </div>
    </div>
  );
}

export default App;

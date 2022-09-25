import { useEffect, useMemo, useState, useReducer, Reducer } from "react";
import { Barcode } from "./component/Barcode";
import { Button } from "./component/Button";
import { Textarea } from "./component/Textarea";
import "./styles/app.css";

type KeyDownEvent<T> = React.KeyboardEvent<T>;

type ActionType =
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

interface StateType {
  data: string[][];
  activePageIndex: number;
}

const maxBarcodePerPage = 8;

function reducer(
  state: StateType,
  { type, data: actionData }: ActionType
): StateType {
  console.log({ type, actionData });
  switch (type) {
    case "add_code": {
      if (!actionData) return state;

      const activePageHasSpace =
        state.data[state.activePageIndex].length < maxBarcodePerPage;

      if (!activePageHasSpace) {
        const newPageIndex = state.data.findIndex(
          (page) => page.length < maxBarcodePerPage
        );

        if (newPageIndex === -1) {
          return {
            ...state,
            data: [...state.data, [actionData]],
          };
        } else {
          return {
            ...state,
            data: state.data.map((page, index) =>
              index === newPageIndex ? [...page, actionData] : page
            ),
          };
        }
      } else {
        state.data[state.activePageIndex].push(actionData);

        return {
          ...state,
          data: [...state.data],
        };
      }
    }
    case "remove_code": {
      state.data[actionData.pageIndex].splice(actionData.codeIndex, 1);
      return {
        ...state,
        data: [...state.data],
      };
    }
    case "add_page": {
      const newPageIndex = state.data.push([]) - 1;

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
    data: [[]],
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
      <div className={"barcode_pages-container"}>
        {data.map((page, pageIndex) => (
          <div
            key={`barcode_page_${pageIndex}`}
            className={`barcodes-page scale-75 print:scale-100 flex flex-wrap relative ${
              activePageIndex === pageIndex ? "--active" : ""
            } ${page.length === 0 ? "--empty" : ""}`}
            onClick={() =>
              dispatch({ type: "change_active_page", data: pageIndex })
            }
          >
            {page.map((code, codeIndex) => {
              const key = `code_${codeIndex}`;

              return (
                <Barcode
                  key={key}
                  id={key}
                  code={code}
                  selftRemove={() =>
                    dispatch({
                      type: "remove_code",
                      data: { pageIndex, codeIndex },
                    })
                  }
                />
              );
            })}
          </div>
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
    console.log(ev);
    if (ev.key !== "+" || !ev.shiftKey) return;

    ev.preventDefault();
    dispatch({ type: "add_page", data: null });
  };

  return (
    <div className="flex flex-col dark:bg-slate-900 min-w-screen min-h-screen print:p-0">
      <div className={"print:hidden fixed w-full bottom-0 p-12 z-50 h-[12rem]"}>
        <div>
          <div>
            <Textarea
              value={inputValue}
              onChange={({ target }) => setInputValue(target.value)}
              onKeyDown={handleTextKeyDown}
              className={"w-full"}
              placeholder="Enter codes here"
            />
          </div>
          <div className={"flex"}>
            <Button className={"ml-auto"} onClick={handleAddCode}>
              Add barcode(s)
            </Button>
          </div>
        </div>
      </div>
      <div className={"flex justify-center"}>{generateCodes}</div>
    </div>
  );
}

export default App;

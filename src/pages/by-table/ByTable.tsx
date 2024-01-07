import React, { useState } from "react";
import { Textarea } from "../../components/Textarea";
import { KeyDownEvent } from "../../types/event";
import { useTableStore } from "./reducer";
import "./styles.css";
import { TableRow } from "./TableRow";

export function ByTable(): React.ReactElement {
  // const [state, dispatch] = useReducer(reducer, getInitialState());
  const data = useTableStore((state) => state.data);
  const setData = useTableStore((state) => state.setData);
  const columns = useTableStore((state) => state.columns);

  const [inputValue, setInputValue] = useState<string>("");

  const handleCreateTable = (): void => {
    console.log(inputValue);

    const rows = inputValue
      .split("\n")
      .map((row) => row.split("\t").map((cell) => cell.trim()));

    setData(rows);
  };

  const handleOnKeyDown = (event: KeyDownEvent<HTMLTextAreaElement>): void => {
    if (event.key === "Tab") {
      event.preventDefault();
      return;
    }

    if (event.key !== "Enter" || !event.ctrlKey) return;

    handleCreateTable();
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setInputValue(event.target.value.trim());
  };

  return (
    <div className={"flex flex-col"}>
      <div className={"flex w-full bg-white p-5 print:hidden"}>
        <Textarea
          className={"flex w-full"}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
        />
      </div>
      <div
        className={"mx-auto w-[75vw] p-5 print:mx-0 print:w-[100vw] print:p-0"}
      >
        <table
          className={
            "barcodes-table table w-[100%] table-fixed print:w-screen print:overflow-hidden print:border-none"
          }
          style={{ ["--column-count" as any]: data[0]?.length }}
        >
          <thead>
            <tr>
              {columns.map((col, index) => {
                return (
                  <th key={`col_${index}`} scope="col">
                    {col}
                  </th>
                );
              })}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} cells={row} rowIndex={rowIndex} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

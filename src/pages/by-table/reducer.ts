import create from "zustand";
import { devtools } from "zustand/middleware";
import { getNormalizeColumnName } from "../../utils/formatting";

import { StateType } from "./action";

export const useTableStore = create<StateType>()(
  devtools(
    (set) => ({
      data: [],
      activeColumnIndex: 0,
      columns: [],
      setData: (data: string[][]) => set((state) => addDataAction(data, state)),
      setActiveColumn: (column: number) =>
        set((state) => setActiveColumnAction(column, state)),
    }),
    {
      name: "table",
    }
  )
);

function addDataAction(data: string[][], state: StateType): StateType {
  const columns: string[][] = [];

  for (let i = 0; i < data[0].length; i++) {
    columns.push(data.map((row) => row[i]));
  }

  return {
    ...state,
    data,
    columns: columns.map((col) => getNormalizeColumnName(col)),
  };
}

function setActiveColumnAction(column: number, state: StateType): StateType {
  return {
    ...state,
    activeColumnIndex: state.activeColumnIndex === column ? 0 : column,
  };
}

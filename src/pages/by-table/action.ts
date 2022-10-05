export interface StateType {
  data: string[][];
  activeColumnIndex: number;
  columns: string[];
  setData: (data: string[][]) => void;
  setActiveColumn: (column: number) => void;
}

export const SET_DATA = "SET_DATA";

export const SET_ACTIVE_COLUMN = "SET_ACTIVE_COLUMN";

export interface SetDataAction {
  type: typeof SET_DATA;
  payload: string[][];
}

export interface SetActiveColumnAction {
  type: typeof SET_ACTIVE_COLUMN;
  payload: number;
}

export type ActionType = SetDataAction | SetActiveColumnAction;

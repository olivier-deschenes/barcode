import { PageType } from "./global";

export interface ClearActionType {
  type: "CLEAR";
  data: null;
}

export interface AddBarcodeActionType {
  type: "add_code";
  data: string;
}

export interface RemoveBarcodeActionType {
  type: "remove_code";
  data: { pageIndex: number; codeIndex: number };
}

export interface AddPageActionType {
  type: "add_page";
  data: null;
}

export interface RemovePageActionType {
  type: "remove_page";
  data: number;
}

export interface ChangeActivePageActionType {
  type: "change_active_page";
  data: number;
}

export type ActionType =
  | AddBarcodeActionType
  | RemoveBarcodeActionType
  | RemovePageActionType
  | AddPageActionType
  | ChangeActivePageActionType
  | ClearActionType;

export interface StateType {
  data: PageType[];
  activePageIndex: number;
}

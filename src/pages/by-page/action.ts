import { PageType } from "../../types/global";

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

export interface ToggleShowBarcodeCode {
  type: "toggle_show_barcode_code";
  data: null;
}

export type ActionType =
  | AddBarcodeActionType
  | RemoveBarcodeActionType
  | RemovePageActionType
  | AddPageActionType
  | ChangeActivePageActionType
  | ClearActionType
  | ToggleShowBarcodeCode;

export interface StateType {
  data: PageType[];
  activePageIndex: number;
  showBarcodeCode: boolean;
}

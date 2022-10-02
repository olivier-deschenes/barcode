import { createRef } from "react";
import { maxBarcodePerPage } from "../App";
import {
  StateType,
  ActionType,
  AddBarcodeActionType,
  RemovePageActionType,
  RemoveBarcodeActionType,
  AddPageActionType,
  ChangeActivePageActionType,
} from "../types/action";
import { BarecodeType } from "../types/global";

export function getInitialData(forceReset: boolean = false): StateType {
  let storageData = localStorage.getItem("data");

  if (forceReset && storageData) {
    localStorage.removeItem("data");
    storageData = null;
  }

  return {
    data: [
      {
        ref: createRef(),
        barcodes: storageData ? JSON.parse(storageData) : [],
      },
    ],
    activePageIndex: 0,
  };
}

function handleClear(): StateType {
  return getInitialData(true);
}

function handleAddCode(
  state: StateType,
  action: AddBarcodeActionType
): StateType {
  action.data = action.data.trim();

  action.data = action.data.trim();
  let code;
  let label;

  code = label = action.data;

  const codebarParts = action.data.split(":");

  if (codebarParts.length === 2) {
    code = codebarParts[1];
    label = codebarParts[0];
  }

  const newBarcode: BarecodeType = {
    code,
    label,
    id: crypto.randomUUID(),
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
        activePageIndex: state.data.length,
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

function handleRemoveCode(
  state: StateType,
  action: RemoveBarcodeActionType
): StateType {
  state.data[action.data.pageIndex].barcodes.splice(action.data.codeIndex, 1);
  return {
    ...state,
    data: [...state.data],
  };
}

function handleAddPage(state: StateType, action: AddPageActionType): StateType {
  const newPageIndex = state.data.push({ ref: createRef(), barcodes: [] }) - 1;

  return {
    data: [...state.data],
    activePageIndex: newPageIndex,
  };
}

function handleRemovePage(
  state: StateType,
  action: RemovePageActionType
): StateType {
  state.data.splice(action.data, 1);

  return {
    ...state,
    data: [...state.data],
  };
}

function handleChangeActivePage(
  state: StateType,
  action: ChangeActivePageActionType
): StateType {
  return {
    ...state,
    activePageIndex: action.data,
  };
}

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "add_code": {
      return handleAddCode(state, action);
    }
    case "remove_code": {
      return handleRemoveCode(state, action);
    }
    case "add_page": {
      return handleAddPage(state, action);
    }
    case "remove_page": {
      return handleRemovePage(state, action);
    }
    case "change_active_page": {
      return handleChangeActivePage(state, action);
    }
    case "CLEAR": {
      return handleClear();
    }
  }
}

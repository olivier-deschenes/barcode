import * as React from "react";
import { Barcode } from "../../components/Barcode";
import { useTableStore } from "./reducer";
interface Props {
  cells: string[];
  rowIndex: number;
}
export function TableRow({ cells, rowIndex }: Props): React.ReactElement {
  const activeColumnIndex = useTableStore((state) => state.activeColumnIndex);
  const data = useTableStore((state) => state.data);
  const setActiveColumn = useTableStore((state) => state.setActiveColumn);

  return (
    <tr>
      {cells.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          scope="col"
          className={`border-slate-600 p-3 hover:cursor-pointer ${
            activeColumnIndex === cellIndex ? "font-bold" : ""
          }`}
          onClick={() => {
            setActiveColumn(cellIndex);
          }}
        >
          {cell}
        </td>
      ))}
      <td>
        <Barcode
          code={{
            code: data[rowIndex][activeColumnIndex],
            id: `row_${rowIndex}${activeColumnIndex}`,
          }}
          options={{ height: 30, width: 1.5 }}
          showBarcodeCode={false}
        />
      </td>
    </tr>
  );
}

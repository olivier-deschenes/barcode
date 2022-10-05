import { BarecodeType, PageType } from "../types/global";

export function encodeBarcode(barcode: BarecodeType): string {
  return `${barcode.label ?? ""}:${barcode.code}`;
}

export function decodeBarcode(barcode: string): BarecodeType {
  const [label, code] = barcode.split(":");
  return {
    id: crypto.randomUUID(),
    label,
    code,
  };
}

export function flattenBarcodes(
  pages: PageType[],
  max?: number
): BarecodeType[] {
  const barcodes = pages.flatMap((page) => page.barcodes);

  return max ? barcodes.slice(Math.max(barcodes.length - max, 0)) : barcodes;
}

export function encodeBarcodes(pages: PageType[], max?: number): string {
  const flatMap = flattenBarcodes(pages, max).map((barcode) =>
    encodeBarcode(barcode)
  );

  return JSON.stringify(flatMap);
}

export function decodeBarcodes(barcodes: string): BarecodeType[] {
  const decoded = JSON.parse(barcodes) as string[];

  return decoded.map((barcode: string) => decodeBarcode(barcode));
}

export function getNormalizeColumnName(
  columns: string[],
  filler = " "
): string {
  let normalizeColumnName = columns.reduce<string>(
    (a, b) => (a.length > b.length ? a : b),
    ""
  );

  columns.forEach((col) => {
    for (let index = 0; index < col.length; index++) {
      if (col[index] !== normalizeColumnName[index]) {
        normalizeColumnName =
          normalizeColumnName.substring(0, index) +
          filler +
          normalizeColumnName.substring(index + filler.length);
      }
    }
  });

  return normalizeColumnName;
}

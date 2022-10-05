export interface BarecodeType {
  code: string;
  label?: string;
  id: string;
}

export interface PageType {
  ref: React.RefObject<HTMLDivElement>;
  barcodes: BarecodeType[];
}

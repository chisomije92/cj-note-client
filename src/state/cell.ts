export interface CellType {
  type: "code" | "text";
}

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}

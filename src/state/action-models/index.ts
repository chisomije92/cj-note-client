export type Direction = "up" | "down";

export interface MoveCellActionModel {
  id: string;
  direction: Direction;
}

// export interface DeleteCellActionModel {
//     id: string;
// }

export interface InsertCellBeforeActionModel {
  id: string | null;
  type: "code" | "text";
}

export interface UpdateCellActionModel {
  id: string;
  content: string;
}

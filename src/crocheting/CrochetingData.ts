import { CrochetingCell } from "./CrochetingCell";

export class CrochetingData {
  #cells: Map<string, CrochetingCell> = new Map();

  toggleCell(x: number, y: number) {
    const cellKey = `${x},${y}`;

    const existingCell = this.#cells.get(cellKey);

    if (existingCell) {
      this.#cells.delete(cellKey);
    } else {
      this.#cells.set(cellKey, { x, y, color: "green" });
    }
  }

  getCells() {
    return [...this.#cells.values()];
  }
}

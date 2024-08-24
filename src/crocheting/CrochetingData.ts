import { CrochetingCell } from "./CrochetingCell";

export class CrochetingData {
  #cells: Map<string, CrochetingCell> = new Map();

  toggleCell(x: number, y: number) {
    const cellKey = this.getKey(x, y);

    const existingCell = this.#cells.get(cellKey);

    if (existingCell) {
      this.#cells.delete(cellKey);

      const aboveAffected = this.getVerticalCellRegion(x, y + 1);
      this.markCellRegion(aboveAffected);

      const belowAffected = this.getVerticalCellRegion(x, y - 1);
      this.markCellRegion(belowAffected);
    } else {
      this.#cells.set(cellKey, { x, y, color: "lightblue" });

      const affected = this.getVerticalCellRegion(x, y);
      this.markCellRegion(affected);
    }
  }

  markCellRegion(region: CrochetingCell[]) {
    if (region.length === 0) return;

    if (region.length === 1) {
      region[0].content = undefined;
      return;
    }

    const reversed = [...region].reverse();
    for (let i = 0; i < reversed.length; i++) {
      if (i % 2 === 0) {
        reversed[i].content = "X";
      } else {
        reversed[i].content = undefined;
      }
    }

    reversed.last()!.content = undefined;
  }

  getVerticalCellRegion(x: number, y: number) {
    let maximumY = y;

    while (this.#cells.has(this.getKey(x, maximumY + 1))) {
      maximumY++;
    }

    const cells: CrochetingCell[] = [];
    let iteratingY = maximumY;
    let cell = this.#cells.get(this.getKey(x, iteratingY--));
    while (cell != null) {
      cells.push(cell);
      cell = this.#cells.get(this.getKey(x, iteratingY--));
    }

    return cells;
  }

  getBoundingRectangle() {
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    for (const cell of this.getCells()) {
      minX = Math.min(minX, cell.x);
      minY = Math.min(minY, cell.y);
      maxX = Math.max(maxX, cell.x);
      maxY = Math.max(maxY, cell.y);
    }

    return { minX, minY, maxX, maxY };
  }

  getCells() {
    return [...this.#cells.values()];
  }

  getKey(x: number, y: number) {
    return `${x},${y}`;
  }
}

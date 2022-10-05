import { HexUtils, Hex } from "react-hexgrid";

const { DIRECTIONS, getID, add: hexAdd } = HexUtils;

export const hasOpposingNeighbours = (filledSet: Set<string>, hex: Hex) =>
  DIRECTIONS.slice(0, 3).some(
    (direction, index) =>
      filledSet.has(getID(hexAdd(direction, hex))) &&
      filledSet.has(getID(hexAdd(DIRECTIONS[index + 3], hex)))
  );

export const hasTripleSplitNeighbours = (filledSet: Set<string>, hex: Hex) =>
  DIRECTIONS.slice(0, 2).some(
    (direction, index) =>
      filledSet.has(getID(hexAdd(direction, hex))) &&
      filledSet.has(getID(hexAdd(DIRECTIONS[index + 2], hex))) &&
      filledSet.has(getID(hexAdd(DIRECTIONS[index + 4], hex)))
  );

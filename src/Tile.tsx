import classNames from "classnames";
import { CSSProperties } from "react";
import { Hex, Hexagon, HexUtils, Text } from "react-hexgrid";

const { getID, add: hexAdd } = HexUtils;

const hasOpposingNeighbours = (filledSet: Set<string>, hex: Hex) =>
  HexUtils.DIRECTIONS.slice(0, 3).some(
    (direction, index) =>
      filledSet.has(getID(hexAdd(direction, hex))) &&
      filledSet.has(getID(hexAdd(HexUtils.DIRECTIONS[index + 3], hex)))
  );

const hasTripleSplitNeighbours = (filledSet: Set<string>, hex: Hex) =>
  HexUtils.DIRECTIONS.slice(0, 2).some(
    (direction, index) =>
      filledSet.has(getID(hexAdd(direction, hex))) &&
      filledSet.has(getID(hexAdd(HexUtils.DIRECTIONS[index + 2], hex))) &&
      filledSet.has(getID(hexAdd(HexUtils.DIRECTIONS[index + 4], hex)))
  );

type TileProps = {
  hex: Hex;
  remainingTiles: Set<string>;
  isSelected: boolean;
  selectTile: (hex: Hex) => void;
};

export const Tile = ({ hex, remainingTiles, isSelected, selectTile }: TileProps) => {
  const id = getID(hex);
  const hasRemaining = remainingTiles.has(id);

  let cellStyles: CSSProperties = {
    fill: "#555",
  };

  if (hasRemaining) {
    cellStyles = {
      ...cellStyles,
      fill: "#999",
    };
  }

  const neighbourCoords = HexUtils.neighbors(hex);
  const filledNeighbours = neighbourCoords.filter((hex) => remainingTiles.has(getID(hex)));
  const openNeighbours = neighbourCoords.filter((hex) => !remainingTiles.has(getID(hex)));
  const numNeighbours = filledNeighbours.length;

  let selectable = hasRemaining;
  if (openNeighbours.length < 3) {
    selectable = false;
  }
  if (openNeighbours.length < 5) {
    const filledSet = new Set(filledNeighbours.map((neighbour) => getID(neighbour)));
    if (hasOpposingNeighbours(filledSet, hex) || hasTripleSplitNeighbours(filledSet, hex)) {
      selectable = false;
    }
  }

  if (selectable) {
    cellStyles = {
      ...cellStyles,
      fill: "#DDD",
    };
  }

  const onClick = () => {
    selectTile(hex);
  };

  return (
    <Hexagon
      {...hex}
      cellStyle={cellStyles}
      className={classNames({ selected: isSelected, available: selectable })}
      onClick={selectable ? onClick : undefined}
    >
      <Text>{numNeighbours}</Text>
    </Hexagon>
  );
};

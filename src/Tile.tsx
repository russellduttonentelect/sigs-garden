import classNames from "classnames";
import { CSSProperties } from "react";
import { Hex, Hexagon, HexUtils, Text } from "react-hexgrid";

const { getID } = HexUtils;

type TileProps = {
  hex: Hex;
  containsTile: boolean;
  isSelected: boolean;
  isSelectable: boolean;
  selectTile: (hex: Hex) => void;
};

export const Tile = ({ hex, containsTile, isSelected, isSelectable, selectTile }: TileProps) => {
  const id = getID(hex);

  let cellStyles: CSSProperties = {
    fill: "#555",
  };

  if (containsTile) {
    cellStyles = {
      ...cellStyles,
      fill: "#999",
    };
  }

  if (isSelectable) {
    cellStyles = {
      ...cellStyles,
      fill: "#DDD",
    };
  }

  const onClick = () => {
    if (isSelectable) {
      selectTile(hex);
    }
  };

  return (
    <Hexagon
      {...hex}
      cellStyle={cellStyles}
      className={classNames({ selected: isSelected, available: isSelectable })}
      onClick={onClick}
    />
  );
};

import classNames from 'classnames';
import { CSSProperties } from 'react';
import { Hex, Hexagon } from 'react-hexgrid';

type TileProps = {
  hex: Hex;
  containsTile: boolean;
  isSelected: boolean;
  isEdge: boolean;
  fill: string;
  selectTile: (hex: Hex) => void;
};

export const Tile = ({
  hex,
  containsTile,
  isSelected,
  isEdge,
  fill,
  selectTile
}: TileProps) => {
  let cellStyles: CSSProperties = {
    fill: '#555'
  };

  if (containsTile) {
    cellStyles = {
      ...cellStyles,
      fill: fill,
      filter: 'contrast(30%)',
      strokeWidth: '0.1pt',
      strokeLinejoin: 'round',
      stroke: '#333'
    };
  }

  if (isEdge) {
    cellStyles = {
      ...cellStyles,
      filter: 'none',
      stroke: '#DDD'
    };
  }

  const onClick = () => {
    selectTile(hex);
  };

  return (
    <Hexagon
      {...hex}
      cellStyle={cellStyles}
      className={classNames({ selected: isSelected, available: isEdge })}
      onClick={onClick}
    />
  );
};

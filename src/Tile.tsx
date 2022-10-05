import classNames from 'classnames';
import { CSSProperties } from 'react';
import { Hex, Hexagon } from 'react-hexgrid';

type TileProps = {
  hex: Hex;
  containsTile: boolean;
  isSelected: boolean;
  isEdge: boolean;
  selectTile: (hex: Hex) => void;
};

export const Tile = ({
  hex,
  containsTile,
  isSelected,
  isEdge,
  selectTile
}: TileProps) => {
  let cellStyles: CSSProperties = {
    fill: '#555'
  };

  if (containsTile) {
    cellStyles = {
      ...cellStyles,
      fill: '#C64',
      filter: 'grayscale(50%)',
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

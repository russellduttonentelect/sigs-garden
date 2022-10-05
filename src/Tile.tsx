import classNames from 'classnames';
import { CSSProperties } from 'react';
import { Hex, Hexagon } from 'react-hexgrid';

type TileProps = {
  hex: Hex;
  containsTile: boolean;
  isSelected: boolean;
  isSelectable: boolean;
  selectTile: (hex: Hex) => void;
};

export const Tile = ({
  hex,
  containsTile,
  isSelected,
  isSelectable,
  selectTile
}: TileProps) => {
  let cellStyles: CSSProperties = {
    fill: '#555'
  };

  if (containsTile) {
    cellStyles = {
      ...cellStyles,
      fill: '#C64',
      filter: 'grayscale(50%)'
    };
  }

  if (isSelectable) {
    cellStyles = {
      ...cellStyles,
      filter: 'none',
      stroke: '#DDD',
      strokeWidth: '0.1pt',
      strokeLinejoin: 'round'
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

import { ThemeIcon } from '@mantine/core';
import classNames from 'classnames';
import { Children, CSSProperties, FC, PropsWithChildren } from 'react';
import { Hex, Hexagon, Text } from 'react-hexgrid';
import { IconPhoto } from '@tabler/icons';
import { Rune } from './Rune.enum';

type TileProps = {
  hex: Hex;
  containsTile: boolean;
  isSelected: boolean;
  isEdge: boolean;
  selectTile: (hex: Hex) => void;
};

const Icon = ({ children }: PropsWithChildren) => {
  return (
    <ThemeIcon
      radius="lg"
      variant="gradient"
      gradient={{ from: 'indigo', to: 'cyan' }}
    >
      {children}
    </ThemeIcon>
  );
};

const iconLookup = {
  [Rune.Earth]: (
    <Icon>
      <IconPhoto />
    </Icon>
  )
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
    >
      <Icon>
        <IconPhoto />
      </Icon>
    </Hexagon>
  );
};

import { useMantineTheme } from '@mantine/core';
import { useCallback } from 'react';
import { Hex, HexUtils } from 'react-hexgrid';
import { useImmer } from 'use-immer';
import { Rune } from '../Rune.enum';
import { Placement } from '../types/placement.type';

export const usePlacedTiles = (placement: Placement = {}) => {
  const [placedTiles, setPlacedTiles] = useImmer(placement);
  const theme = useMantineTheme();

  const deleteTile = useCallback(
    (coord: keyof Placement) =>
      setPlacedTiles((draft) => {
        delete draft[coord];
      }),
    []
  );

  const addTile = useCallback(
    (coord: keyof Placement, type: Placement[number]) => {
      setPlacedTiles((draft) => {
        draft[coord] = type;
      });
    },
    []
  );

  const resetPlacement = useCallback(() => {
    setPlacedTiles(placement);
  }, []);

  const clearPlacement = useCallback(() => {
    setPlacedTiles({});
  }, []);

  const getTileType = (hex: Hex | string) => {
    const lookup = typeof hex === 'string' ? hex : HexUtils.getID(hex);
    if (!placedTiles.hasOwnProperty(lookup)) {
      return '';
    }

    return placedTiles[lookup];
  };

  const coordToHex = (coord: keyof Placement) => {
    const [q, r, s] = coord.split(',');

    return new Hex(Number(q), Number(r), Number(s));
  };

  const getTileFill = (hex: Hex) => {
    const tile = getTileType(hex);
    switch (tile) {
      case Rune.Air:
        return theme.colors.indigo[5];
      case Rune.Water:
        return theme.colors.blue[5];
      case Rune.Fire:
        return theme.colors.red[5];
      case Rune.Earth:
        return theme.colors.lime[5];
      case Rune.Elemental:
        return '#B88';
      case Rune.Light:
        return '#ffffaa';
      case Rune.Shadow:
        return '#333';
      case Rune.Quicksilver:
        return '#597e8d';
      case Rune.Magnesium:
        return '#9a9ea3';
      case Rune.Iron:
        return '#625e59';
      case Rune.Copper:
        return '#B77333';
      case Rune.Zinc:
        return '#4c4c49';
      case Rune.Platinum:
        return '#95978e';
      case Rune.Titanium:
        return '#95978e';
      default:
        return '#666';
    }
  };

  return {
    placedTiles,
    addTile,
    deleteTile,
    resetPlacement,
    clearPlacement,
    getTileType,
    coordToHex,
    getTileFill
  };
};

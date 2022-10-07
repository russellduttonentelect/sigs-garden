import { useCallback } from 'react';
import { Hex, HexUtils } from 'react-hexgrid';
import { useImmer } from 'use-immer';

export const usePlacedTiles = (placement: Record<string, string> = {}) => {
  const [placedTiles, setPlacedTiles] = useImmer(placement);

  const deleteTile = useCallback(
    (coord: string) =>
      setPlacedTiles((draft) => {
        delete draft[coord];
      }),
    []
  );

  const addTile = useCallback((coord: string, type: string) => {
    setPlacedTiles((draft) => {
      draft[coord] = type;
    });
  }, []);

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

  const coordToHex = (coord: string) => {
    const [q, r, s] = coord.split(',');

    return new Hex(Number(q), Number(r), Number(s));
  };

  return {
    placedTiles,
    addTile,
    deleteTile,
    resetPlacement,
    clearPlacement,
    getTileType,
    coordToHex
  };
};

import { useCallback } from 'react';
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

  return { placedTiles, addTile, deleteTile, resetPlacement, clearPlacement };
};

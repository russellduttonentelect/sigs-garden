import { useState } from 'react';
import { HexUtils, Hex } from 'react-hexgrid';
import { Box, Button, Container, Title } from '@mantine/core';
import { Tile } from './Tile';
import { useCoords } from './hooks/use-coords';
import { useCopyToClipboard } from 'react-use';
import { showNotification } from '@mantine/notifications';
import { hasOpposingNeighbours, hasTripleSplitNeighbours } from './util';
import { usePlacedTiles } from './hooks/use-placed-tiles';
import { Board } from './Board';

const { getID } = HexUtils;

const RADIUS = 5;

export const GameLogic = () => {
  const [selectedTile, setSelectedTile] = useState('');
  const { pattern1, pattern2 } = useCoords();
  const [, copyToClipboard] = useCopyToClipboard();

  const { placedTiles, deleteTile, resetPlacement, clearPlacement } =
    usePlacedTiles(pattern1);

  const selectTile = (hex: Hex) => {
    const hexId = getID(hex);
    if (!selectedTile) {
      if (hexId === getID(new Hex(0, 0, 0))) {
        deleteTile(hexId);
        return;
      }

      setSelectedTile(hexId);
      return;
    }

    if (selectedTile === hexId) {
      setSelectedTile('');
      return;
    }

    deleteTile(selectedTile);
    deleteTile(hexId);
    setSelectedTile('');
  };

  const isSelectable = (hex: Hex) => {
    const id = getID(hex);
    const containsTile = placedTiles.hasOwnProperty(id);

    const neighbourCoords = HexUtils.neighbors(hex);
    const filledNeighbours = neighbourCoords.filter((hex) =>
      placedTiles.hasOwnProperty(getID(hex))
    );
    const openNeighbours = neighbourCoords.filter(
      (hex) => !placedTiles.hasOwnProperty(getID(hex))
    );

    if (openNeighbours.length < 3) {
      return false;
    }
    if (openNeighbours.length < 5) {
      const filledSet = new Set(
        filledNeighbours.map((neighbour) => getID(neighbour))
      );
      if (
        hasOpposingNeighbours(filledSet, hex) ||
        hasTripleSplitNeighbours(filledSet, hex)
      ) {
        return false;
      }
    }

    return containsTile;
  };

  const copyCoords = () => {
    copyToClipboard(JSON.stringify(placedTiles));
    showNotification({
      message: 'Copied to Clipboard!',
      autoClose: 3000
    });
  };

  return (
    <Container fluid>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Button.Group>
          <Button onClick={() => resetPlacement()}>Reseed</Button>
          <Button onClick={() => clearPlacement()}>Clear</Button>
          <Button onClick={() => copyCoords()}>Copy Coords</Button>
        </Button.Group>
        <Title size="h3">
          Tiles Remaining: {Object.keys(placedTiles).length}
        </Title>
      </Box>
      <Board
        radius={RADIUS}
        renderTile={(hex) => (
          <Tile
            hex={hex}
            key={HexUtils.getID(hex)}
            containsTile={placedTiles.hasOwnProperty(getID(hex))}
            isSelected={getID(hex) === selectedTile}
            selectTile={selectTile}
            isSelectable={isSelectable(hex)}
          />
        )}
      />
    </Container>
  );
};

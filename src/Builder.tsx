import { Container, Box, Button, Title, createStyles } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { Hex, Hexagon, HexGrid, HexUtils, Layout } from 'react-hexgrid';
import { useCopyToClipboard } from 'react-use';
import { Board } from './Board';
import { useCoords } from './hooks/use-coords';
import { usePlacedTiles } from './hooks/use-placed-tiles';
import { Tile } from './Tile';
import { hasOpposingNeighbours, hasTripleSplitNeighbours } from './util';

const { getID } = HexUtils;
const useStyles = createStyles(() => ({
  grid: {
    rotate: '90deg'
  }
}));

const RADIUS = 5;

export const Builder = () => {
  const { classes } = useStyles();
  const [, copyToClipboard] = useCopyToClipboard();

  const { placedTiles, addTile, deleteTile, resetPlacement, clearPlacement } =
    usePlacedTiles();

  const selectTile = (hex: Hex) => {
    const hexId = getID(hex);
    if (placedTiles.hasOwnProperty(hexId)) {
      deleteTile(hexId);
    } else {
      addTile(hexId, '');
    }
  };

  const isEdge = (hex: Hex) => {
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
    const copyText =
      '{' +
      Object.entries(placedTiles).reduce((output, [key, value]) => {
        const coords = key.split(',');
        return `${output}[createCoord(${coords[0]}, ${coords[1]})]: "${value}",`;
      }, '') +
      '}';

    copyToClipboard(copyText);
    showNotification({
      message: 'Copied to Clipboard!',
      autoClose: 3000
    });
  };

  return (
    <Container
      fluid
      px={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
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
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexGrow: 1,
          justifyContent: 'center'
        }}
      >
        <Board
          radius={RADIUS}
          renderTile={(hex) => (
            <Tile
              hex={hex}
              key={HexUtils.getID(hex)}
              containsTile={placedTiles.hasOwnProperty(getID(hex))}
              isSelected={false}
              selectTile={selectTile}
              isEdge={isEdge(hex)}
            />
          )}
        />
      </Box>
    </Container>
  );
};

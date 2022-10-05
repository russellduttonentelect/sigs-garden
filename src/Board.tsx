import { useCallback, useState } from 'react';
import { GridGenerator, HexGrid, Layout, HexUtils, Hex } from 'react-hexgrid';
import { Box, Button, Container, createStyles, Title } from '@mantine/core';
import { useImmer } from 'use-immer';
import { Tile } from './Tile';
import { useCoords } from './hooks/use-coords';
import { useCopyToClipboard } from 'react-use';
import { showNotification } from '@mantine/notifications';
import { useElementSize } from '@mantine/hooks';
import { hasOpposingNeighbours, hasTripleSplitNeighbours } from './util';
import { usePlacedTiles } from './hooks/use-placed-tiles';

const { getID } = HexUtils;

const RADIUS = 5;
const useStyles = createStyles(() => ({
  grid: {
    rotate: '90deg'
  }
}));

const createCoord = (q: number, r: number) => getID(new Hex(q, r, -q - r));

export const Board = () => {
  const { classes } = useStyles();
  const [selectedTile, setSelectedTile] = useState('');
  const { pattern1, pattern2 } = useCoords();
  const [, copyToClipboard] = useCopyToClipboard();
  const { ref, width, height } = useElementSize();
  const gridSize = Math.min(width, height);

  const coordinates = GridGenerator.hexagon(RADIUS);

  const { placedTiles, deleteTile, resetPlacement, clearPlacement } =
    usePlacedTiles(pattern2);

  const selectTile = (hex: Hex) => {
    const hexId = getID(hex);
    if (!selectedTile) {
      if (hexId === createCoord(0, 0)) {
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
    const coordinates = Object.keys(placedTiles).reduce(
      (output, tile) =>
        `${output}createCoord(${tile.split(',')[0]}, ${tile.split(',')[1]}),`,
      ''
    );

    copyToClipboard(coordinates);
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
      <Box ref={ref} className="grid">
        <HexGrid width={gridSize} height={gridSize}>
          <Layout
            size={{ x: 4.8, y: 4.8 }}
            flat={true}
            spacing={1.1}
            origin={{ x: 0, y: 0 }}
            className={classes.grid}
          >
            {coordinates.map((hex) => (
              <Tile
                hex={hex}
                key={HexUtils.getID(hex)}
                containsTile={placedTiles.hasOwnProperty(getID(hex))}
                isSelected={getID(hex) === selectedTile}
                selectTile={selectTile}
                isSelectable={isSelectable(hex)}
              />
            ))}
          </Layout>
        </HexGrid>
      </Box>
    </Container>
  );
};

import { PropsWithChildren, useState } from 'react';
import { HexUtils, Hex, HexGrid, Layout, Hexagon } from 'react-hexgrid';
import { Box, Button, Container, Stack, ThemeIcon, Title } from '@mantine/core';
import { Tile } from './Tile';
import { useCoords } from './hooks/use-coords';
import { useCopyToClipboard } from 'react-use';
import { showNotification } from '@mantine/notifications';
import { hasOpposingNeighbours, hasTripleSplitNeighbours } from './util';
import { usePlacedTiles } from './hooks/use-placed-tiles';
import { Board } from './Board';
import { Rune } from './Rune.enum';
import { get } from 'lodash';
import { RuneIcon } from './RuneIcon';

const { getID } = HexUtils;

const RADIUS = 5;

export const GameLogic = () => {
  const [selectedTile, setSelectedTile] = useState('');
  const { pattern1, pattern2 } = useCoords();
  const [, copyToClipboard] = useCopyToClipboard();

  const { placedTiles, deleteTile, resetPlacement, clearPlacement } =
    usePlacedTiles(pattern2);

  const selectTile = (hex: Hex) => {
    if (isEdge(hex)) {
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
    copyToClipboard(JSON.stringify(placedTiles));
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
          justifyContent: 'center',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          border: '1pt solid #444',
          backgroundColor: '#444'
        }}
      >
        <Board
          radius={RADIUS}
          renderTile={(hex) => (
            <Tile
              hex={hex}
              key={HexUtils.getID(hex)}
              containsTile={placedTiles.hasOwnProperty(getID(hex))}
              isSelected={getID(hex) === selectedTile}
              selectTile={selectTile}
              isEdge={isEdge(hex)}
            />
          )}
        />
        <Stack sx={{ padding: 4 }}>
          {Object.values(Rune).map((rune, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '60px',
                background: 'white',
                borderRadius: '40px'
              }}
            >
              <RuneIcon rune={rune} />
              <Title order={4} color="black" sx={{ paddingRight: 8 }}>
                1
              </Title>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

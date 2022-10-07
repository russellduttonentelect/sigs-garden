import {
  Box,
  Button,
  Container,
  Stack,
  Title,
  useMantineTheme
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { Hex, HexUtils } from 'react-hexgrid';
import { useCopyToClipboard } from 'react-use';
import { Board } from './Board';
import { GridIcon } from './GridIcon';
import { useCoords } from './hooks/use-coords';
import { usePlacedTiles } from './hooks/use-placed-tiles';
import { MantineIcon } from './MantineIcon';
import { Rune } from './Rune.enum';
import { Tile } from './Tile';
import { hasOpposingNeighbours, hasTripleSplitNeighbours } from './util';

const { getID } = HexUtils;

const RADIUS = 5;

export const GameLogic = () => {
  const [selectedTile, setSelectedTile] = useState('');
  const { pattern1, pattern2 } = useCoords();
  const [, copyToClipboard] = useCopyToClipboard();
  const theme = useMantineTheme();

  const {
    placedTiles,
    deleteTile,
    resetPlacement,
    clearPlacement,
    getTileType
  } = usePlacedTiles(pattern2);

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

      const selectedType = getTileType(hex);

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
              fill={getTileFill(hex)}
            />
          )}
        >
          <g>
            <GridIcon rune={Rune.Titanium} size={6} x={0} y={0} />
          </g>
        </Board>
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
              <MantineIcon rune={rune} />
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

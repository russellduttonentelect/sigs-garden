import {
  Box,
  Button,
  Container,
  createStyles,
  Title,
  useMantineTheme
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Hex, HexUtils } from 'react-hexgrid';
import { useCopyToClipboard } from 'react-use';
import { Board } from './Board';
import { useCoords } from './hooks/use-coords';
import { usePlacedTiles } from './hooks/use-placed-tiles';
import { Rune } from './Rune.enum';
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
  const { pattern1, pattern2 } = useCoords();
  const [, copyToClipboard] = useCopyToClipboard();
  const theme = useMantineTheme();

  const {
    placedTiles,
    addTile,
    deleteTile,
    resetPlacement,
    clearPlacement,
    getTileType
  } = usePlacedTiles();

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
              isSelected={false}
              selectTile={selectTile}
              isEdge={isEdge(hex)}
              fill={getTileFill(hex)}
            />
          )}
        />
      </Box>
    </Container>
  );
};

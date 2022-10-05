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
import {
  IconPhoto,
  IconPlant,
  IconDroplet,
  IconFlame,
  IconRipple,
  Icon3dCubeSphere,
  IconSun,
  IconMoon,
  IconLayoutAlignBottom,
  IconTallymark1,
  IconTallymark2,
  IconTallymark3,
  IconTallymark4,
  IconTallymarks,
  IconLetterT
} from '@tabler/icons';
import { Rune } from './Rune.enum';
import { get } from 'lodash';

const { getID } = HexUtils;

const RADIUS = 5;

const getRuneIcon = (rune: Rune) => {
  const iconLookup = {
    [Rune.Earth]: <IconPlant />,
    [Rune.Water]: <IconDroplet />,
    [Rune.Fire]: <IconFlame />,
    [Rune.Air]: <IconRipple />,
    [Rune.Elemental]: <Icon3dCubeSphere />,
    [Rune.Light]: <IconSun />,
    [Rune.Shadow]: <IconMoon />,
    [Rune.Quicksilver]: <IconLayoutAlignBottom />,
    [Rune.Magnesium]: <IconTallymark1 />,
    [Rune.Iron]: <IconTallymark2 />,
    [Rune.Copper]: <IconTallymark3 />,
    [Rune.Zinc]: <IconTallymark4 />,
    [Rune.Platinum]: <IconTallymarks />,
    [Rune.Titanium]: <IconLetterT />
  };

  const gradientLookup = {
    [Rune.Earth]: { from: 'green', to: 'lime' },
    [Rune.Water]: { from: 'blue', to: 'cyan' },
    [Rune.Fire]: { from: 'red', to: 'yellow' },
    [Rune.Air]: { from: 'gray', to: '#7AE' },
    [Rune.Elemental]: { from: '#77A', to: '#B88' },
    [Rune.Light]: { from: '#dd9f88', to: '#ddcc88' },
    [Rune.Shadow]: { from: 'black', to: '#BBB' },
    [Rune.Quicksilver]: { from: '#597e8d', to: '#9e9e9e' },
    [Rune.Magnesium]: { from: '#9a9ea3', to: '#9a9ea3' },
    [Rune.Iron]: { from: '#625e59', to: '#625e59' },
    [Rune.Copper]: { from: '#B77333', to: '#B77333' },
    [Rune.Zinc]: { from: '#4c4c49', to: '#4c4c49' },
    [Rune.Platinum]: { from: '#95978e', to: '#95978e' },
    [Rune.Titanium]: { from: '#cdcdcd', to: '#dedede' }
  };

  return (
    <ThemeIcon
      radius={40}
      size={40}
      variant="gradient"
      gradient={get(gradientLookup, rune)}
    >
      {get(iconLookup, rune, <IconPhoto />)}
    </ThemeIcon>
  );
};

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
        <Stack>
          {getRuneIcon(Rune.Earth)}
          {getRuneIcon(Rune.Water)}
          {getRuneIcon(Rune.Fire)}
          {getRuneIcon(Rune.Air)}
          {getRuneIcon(Rune.Elemental)}
          {getRuneIcon(Rune.Light)}
          {getRuneIcon(Rune.Shadow)}
          {getRuneIcon(Rune.Quicksilver)}
          {getRuneIcon(Rune.Magnesium)}
          {getRuneIcon(Rune.Iron)}
          {getRuneIcon(Rune.Copper)}
          {getRuneIcon(Rune.Zinc)}
          {getRuneIcon(Rune.Platinum)}
          {getRuneIcon(Rune.Titanium)}
        </Stack>
      </Box>
    </Container>
  );
};

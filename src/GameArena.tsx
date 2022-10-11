import { Box, Button, Container, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { Hex, HexUtils } from 'react-hexgrid';
import { useCopyToClipboard } from 'react-use';
import { Board } from './Board';
import { GridIcon } from './components/GridIcon';
import { Tile } from './components/Tile';
import {
  isBaseElementMatch,
  isElementalMatch,
  isLightShadowMatch,
  isMetalMatch
} from './game-logic';
import { useCoords } from './hooks/use-coords';
import { usePlacedTiles } from './hooks/use-placed-tiles';
import { Rune } from './Rune.enum';
import { TileBreakdown } from './TileBreakdown';

const { getID } = HexUtils;

const RADIUS = 5;

export const GameArena = () => {
  const [activeTile, setActiveTile] = useState('');
  const { pattern3: coords } = useCoords();
  const [, copyToClipboard] = useCopyToClipboard();

  const {
    placedTiles,
    deleteTile,
    resetPlacement,
    clearPlacement,
    getTileType,
    coordToHex,
    getTileFill,
    isEdge,
    isNextMetalProgression
  } = usePlacedTiles(coords);

  const selectTile = (hex: Hex) => {
    if (isEdge(hex)) {
      const hexId = getID(hex);
      if (!activeTile) {
        if (
          hexId === getID(new Hex(0, 0, 0)) &&
          isNextMetalProgression(hexId)
        ) {
          deleteTile(hexId);
          return;
        }

        setActiveTile(hexId);
        return;
      }

      if (activeTile === hexId) {
        setActiveTile('');
        return;
      }

      const activeType = getTileType(activeTile);
      const selectedType = getTileType(hexId);

      const shouldCancelOut =
        isLightShadowMatch(activeType, selectedType) ||
        isBaseElementMatch(activeType, selectedType) ||
        isElementalMatch(activeType, selectedType) ||
        (isMetalMatch(activeType, selectedType) &&
          (isNextMetalProgression(activeTile) ||
            isNextMetalProgression(hexId)));

      if (shouldCancelOut) {
        deleteTile(activeTile);
        deleteTile(hexId);
        setActiveTile('');
        return;
      }

      setActiveTile(hexId);
      return;
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
              isSelected={getID(hex) === activeTile}
              selectTile={selectTile}
              isEdge={isEdge(hex)}
              fill={getTileFill(hex)}
            />
          )}
        >
          {Object.keys(placedTiles).map((coord) => {
            const hex = coordToHex(coord);
            return (
              <GridIcon
                onClick={() => selectTile(hex)}
                rune={getTileType(coord) as Rune}
                size={6}
                hex={hex}
              />
            );
          })}
        </Board>
        <TileBreakdown placedTiles={placedTiles} />
      </Box>
    </Container>
  );
};

import { Box, Button, Container, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { Hex, HexUtils } from 'react-hexgrid';
import { useCopyToClipboard } from 'react-use';
import { Board } from './Board';
import { GridIcon } from './components/GridIcon';
import { Tile } from './components/Tile';
import { useCoords } from './hooks/use-coords';
import { usePlacedTiles } from './hooks/use-placed-tiles';
import { Rune } from './Rune.enum';
import { TileBreakdown } from './TileBreakdown';
import { Placement } from './types/placement.type';

const { getID } = HexUtils;

const RADIUS = 5;

export const Builder = () => {
  const { pattern3 } = useCoords();
  const [, copyToClipboard] = useCopyToClipboard();
  const [selectedType, setSelectedType] = useState<Placement[number]>('');

  const {
    placedTiles,
    addTile,
    deleteTile,
    resetPlacement,
    clearPlacement,
    getTileType,
    coordToHex,
    getTileFill,
    isEdge
  } = usePlacedTiles(pattern3);

  const selectTile = (hex: Hex) => {
    const hexId = getID(hex);
    if (placedTiles.hasOwnProperty(hexId)) {
      deleteTile(hexId);
    } else {
      addTile(hexId, selectedType);
    }
  };

  const copyCoords = () => {
    const copyText =
      '{' +
      Object.entries(placedTiles).reduce((output, [key, value]) => {
        const coords = key.split(',');
        return `${output}[createCoord(${coords[0]}, ${coords[1]})]: Rune.${value},`;
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
        <TileBreakdown
          placedTiles={placedTiles}
          onTileClick={setSelectedType}
        />
      </Box>
    </Container>
  );
};

import { Box, createStyles } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { ReactElement } from 'react';
import {
  GridGenerator,
  Hex,
  Hexagon,
  HexGrid,
  HexUtils,
  Layout,
  Pattern
} from 'react-hexgrid';
import { flatten, range } from 'lodash';

const useStyles = createStyles(() => ({
  grid: {
    rotate: '90deg'
  }
}));
type BoardProps = {
  radius: number;
  renderTile: (hex: Hex) => ReactElement;
};

export const Board = ({ radius, renderTile }: BoardProps) => {
  const { classes } = useStyles();
  const { ref, width, height } = useElementSize();
  const gridSize = Math.min(width, height);

  const coordinates = GridGenerator.hexagon(radius);

  const paletteCoords = flatten(
    range(0, 2).map((q) => range(3, -4).map((r) => [q, r] as const))
  );

  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
      className={`${gridSize}`}
    >
      <Box>
        <HexGrid width={gridSize} height={gridSize} viewBox="-50 -50 100 135">
          <Layout
            size={{ x: 5, y: 5 }}
            flat={true}
            spacing={1.1}
            origin={{ x: 0, y: 0 }}
            className="rotate"
          >
            {coordinates.map(renderTile)}
          </Layout>
          <Layout
            size={{ x: 5, y: 5 }}
            flat={true}
            spacing={1.1}
            origin={{ x: 65, y: 0 }}
            className="rotate"
          >
            {paletteCoords.map(([q, r]) => (
              <Hexagon
                key={HexUtils.getID(new Hex(q, r, -q - r))}
                {...new Hex(q, r, -q - r)}
                cellStyle={{ fill: '#AAA' }}
              />
            ))}
          </Layout>
        </HexGrid>
      </Box>
    </Box>
  );
};

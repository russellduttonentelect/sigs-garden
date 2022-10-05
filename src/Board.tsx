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
import { Rune } from './Rune.enum';
import { RuneIcon } from './RuneIcon';

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

  return (
    <Box
      ref={ref}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <HexGrid width={gridSize} height={gridSize} viewBox="-50 -50 100 100">
        <Layout
          size={{ x: 5, y: 5 }}
          flat={true}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
          className="rotate"
        >
          {coordinates.map(renderTile)}
        </Layout>
        <RuneIcon rune={Rune.Air} />
      </HexGrid>
    </Box>
  );
};

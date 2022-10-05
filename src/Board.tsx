import { Box, createStyles } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { ReactElement } from 'react';
import { GridGenerator, Hex, HexGrid, HexUtils, Layout } from 'react-hexgrid';

const { getID } = HexUtils;
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
    <Box ref={ref} className="grid">
      <HexGrid width={gridSize} height={gridSize}>
        <Layout
          size={{ x: 4.8, y: 4.8 }}
          flat={true}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
          className={classes.grid}
        >
          {coordinates.map(renderTile)}
        </Layout>
      </HexGrid>
    </Box>
  );
};

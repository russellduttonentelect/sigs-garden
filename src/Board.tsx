import { Box, createStyles } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { PropsWithChildren, ReactElement } from 'react';
import { GridGenerator, Hex, HexGrid, Layout } from 'react-hexgrid';

const useStyles = createStyles(() => ({
  grid: {
    rotate: '90deg'
  }
}));
type BoardProps = {
  radius: number;
  renderTile: (hex: Hex) => ReactElement;
};

export const Board = ({
  radius,
  renderTile,
  children
}: PropsWithChildren<BoardProps>) => {
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
          flat={false}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
          className="rotate"
        >
          {coordinates.map(renderTile)}
        </Layout>
        {children}
      </HexGrid>
    </Box>
  );
};

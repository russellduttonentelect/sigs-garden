import { useCallback, useState } from "react";
import { GridGenerator, HexGrid, Layout, HexUtils, Hex } from "react-hexgrid";
import { Box, Button, Container, createStyles, Title } from "@mantine/core";
import { useImmer } from "use-immer";
import { Tile } from "./Tile";
import { useCoords } from "./use-coords";
import { useCopyToClipboard } from "react-use";
import { showNotification } from "@mantine/notifications";
import { useElementSize } from "@mantine/hooks";

const { getID } = HexUtils;

const RADIUS = 5;
const useStyles = createStyles(() => ({
  grid: {
    rotate: "90deg",
  },
}));

const createCoord = (q: number, r: number) => getID(new Hex(q, r, -q - r));

export const Board = () => {
  const { classes } = useStyles();
  const [selectedTile, setSelectedTile] = useState("");
  const { pattern1, pattern2 } = useCoords();
  const coords = pattern1;
  const [, copyToClipboard] = useCopyToClipboard();
  const { ref, width, height } = useElementSize();
  const gridSize = Math.min(width, height);

  const coordinates = GridGenerator.hexagon(RADIUS);

  const [remainingTiles, setRemainingTiles] = useImmer(coords);

  const deleteTile = useCallback(
    (id: string) =>
      setRemainingTiles((draft) => {
        draft.delete(id);
      }),
    []
  );

  const addTile = useCallback(
    (hex: Hex) =>
      setRemainingTiles((draft) => {
        draft.add(getID(hex));
      }),
    []
  );

  const reseedTiles = useCallback(() => {
    setRemainingTiles(coords);
    setSelectedTile("");
  }, []);
  const clearTiles = useCallback(() => {
    setRemainingTiles(new Set());
    setSelectedTile("");
  }, []);

  const selectTile = (hex: Hex) => {
    const hexId = getID(hex);
    if (!selectedTile) {
      if (hexId === createCoord(0, 0)) {
        deleteTile(hexId);
        return;
      }

      setSelectedTile(hexId);
      return;
    }

    if (selectedTile === hexId) {
      setSelectedTile("");
      return;
    }

    deleteTile(selectedTile);
    deleteTile(hexId);
    setSelectedTile("");
  };

  const copyCoords = () => {
    const coordinates = [...remainingTiles].reduce(
      (output, tile) => `${output}createCoord(${tile.split(",")[0]}, ${tile.split(",")[1]}),`,
      ""
    );

    copyToClipboard(coordinates);
    showNotification({
      message: "Copied to Clipboard!",
      autoClose: 3000,
    });
  };

  return (
    <Container fluid>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Button.Group>
          <Button onClick={() => reseedTiles()}>Reseed</Button>
          <Button onClick={() => clearTiles()}>Clear</Button>
          <Button onClick={() => copyCoords()}>Copy Coords</Button>
        </Button.Group>
        <Title size="h3">Tiles Remaining: {[...remainingTiles].length}</Title>
      </Box>
      <Box ref={ref} className="grid">
        <HexGrid width={gridSize} height={gridSize}>
          <Layout
            size={{ x: 4.8, y: 4.8 }}
            flat={true}
            spacing={1.1}
            origin={{ x: 0, y: 0 }}
            className={classes.grid}
          >
            {coordinates.map((hex) => (
              <Tile
                hex={hex}
                key={HexUtils.getID(hex)}
                remainingTiles={remainingTiles}
                isSelected={getID(hex) === selectedTile}
                selectTile={selectTile}
                addTile={addTile}
                showNeighbourCount={false}
              />
            ))}
          </Layout>
        </HexGrid>
      </Box>
    </Container>
  );
};

import { useCallback, useState } from "react";
import "./App.css";
import { GridGenerator, HexGrid, Layout, HexUtils, Hex } from "react-hexgrid";
import { Button, createStyles } from "@mantine/core";
import { useImmer } from "use-immer";

import { enableMapSet } from "immer";
import { Tile } from "./Tile";

enableMapSet();

const { getID } = HexUtils;

const RADIUS = 5;
const useStyles = createStyles(() => ({
  grid: {
    rotate: "90deg",
  },
}));

const seedCoords = [
  getID(new Hex(0, 0, 0)),
  getID(new Hex(1, 0, -1)),
  getID(new Hex(1, -1, 0)),
  getID(new Hex(0, -1, 1)),
  getID(new Hex(-1, 0, 1)),
  getID(new Hex(-1, 1, 0)),
  getID(new Hex(0, 1, -1)),
  getID(new Hex(-2, 2, 0)),
  getID(new Hex(-2, 0, 2)),
  getID(new Hex(2, 0, -2)),
  getID(new Hex(2, -1, -1)),
];

const App = () => {
  const { classes } = useStyles();
  const [selectedTile, setSelectedTile] = useState("");

  const coordinates = GridGenerator.hexagon(RADIUS);

  const [remainingTiles, setRemainingTiles] = useImmer(new Set(seedCoords));

  const deleteTile = useCallback(
    (id: string) =>
      setRemainingTiles((draft) => {
        draft.delete(id);
      }),
    []
  );

  const resetTiles = useCallback(() => setRemainingTiles(new Set(seedCoords)), []);

  const selectTile = (hex: Hex) => {
    const hexId = getID(hex);
    if (!selectedTile) {
      setSelectedTile(hexId);
      return;
    }

    if (selectedTile === hexId) {
      setSelectedTile("");
      return;
    }

    deleteTile(hexId);
    deleteTile(selectedTile);
    setSelectedTile("");
  };

  return (
    <div className="App">
      <Button onClick={() => resetTiles()}>Reset</Button>
      <HexGrid width={1000} height={900}>
        <Layout
          size={{ x: 5, y: 5 }}
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
            />
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
};

export default App;

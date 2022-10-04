import { CSSProperties, useCallback, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  GridGenerator,
  Hexagon,
  HexGrid,
  Layout,
  HexUtils,
  Hex,
  Pattern,
  Text,
} from "react-hexgrid";
import { createStyles } from "@mantine/core";
import classNames from "classnames";
import { useImmer } from "use-immer";

import { enableMapSet } from "immer";

enableMapSet();

const { getID, add: hexAdd } = HexUtils;

const RADIUS = 5;
const useStyles = createStyles(() => ({
  grid: {
    rotate: "90deg",
  },
}));

type TileProps = {
  hex: Hex;
};

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

const hasOpposingNeighbours = (filledSet: Set<string>, hex: Hex) =>
  HexUtils.DIRECTIONS.slice(0, 3).some(
    (direction, index) =>
      filledSet.has(getID(hexAdd(direction, hex))) &&
      filledSet.has(getID(hexAdd(HexUtils.DIRECTIONS[index + 3], hex)))
  );

const hasTripleSplitNeighbours = (filledSet: Set<string>, hex: Hex) =>
  HexUtils.DIRECTIONS.slice(0, 2).some(
    (direction, index) =>
      filledSet.has(getID(hexAdd(direction, hex))) &&
      filledSet.has(getID(hexAdd(HexUtils.DIRECTIONS[index + 2], hex))) &&
      filledSet.has(getID(hexAdd(HexUtils.DIRECTIONS[index + 4], hex)))
  );

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

  const Tile = ({ hex }: TileProps) => {
    const id = getID(hex);
    const hasRemaining = remainingTiles.has(id);

    let cellStyles: CSSProperties = {
      fill: "#555",
    };

    if (hasRemaining) {
      cellStyles = {
        ...cellStyles,
        fill: "#999",
      };
    }

    const neighbourCoords = HexUtils.neighbors(hex);
    const filledNeighbours = neighbourCoords.filter((hex) => remainingTiles.has(getID(hex)));
    const openNeighbours = neighbourCoords.filter((hex) => !remainingTiles.has(getID(hex)));
    const numNeighbours = filledNeighbours.length;

    let clearable = hasRemaining;
    if (openNeighbours.length < 3) {
      clearable = false;
    }
    if (openNeighbours.length < 5) {
      const filledSet = new Set(filledNeighbours.map((neighbour) => getID(neighbour)));
      if (hasOpposingNeighbours(filledSet, hex) || hasTripleSplitNeighbours(filledSet, hex)) {
        clearable = false;
      }
    }

    if (clearable) {
      cellStyles = {
        ...cellStyles,
        fill: "#DDD",
      };
    }

    const onClick = () => {
      selectTile(hex);
    };

    return (
      <Hexagon
        {...hex}
        cellStyle={cellStyles}
        className={classNames({ selected: selectedTile === id, available: clearable })}
        onClick={clearable ? onClick : undefined}
      >
        <Text>{numNeighbours}</Text>
      </Hexagon>
    );
  };

  return (
    <div className="App">
      <HexGrid width={1000} height={900}>
        <Layout
          size={{ x: 5, y: 5 }}
          flat={true}
          spacing={1.1}
          origin={{ x: 0, y: 0 }}
          className={classes.grid}
        >
          {coordinates.map((hex) => (
            <Tile hex={hex} key={HexUtils.getID(hex)} />
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
};

export default App;

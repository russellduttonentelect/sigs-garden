import { CSSProperties, useState } from "react";
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

const { getID } = HexUtils;

const RADIUS = 5;
const useStyles = createStyles(() => ({
  grid: {
    rotate: "90deg",
  },
}));

type TileProps = {
  hex: Hex;
};

const containsRemainingTile = (remaining: Hex[], coords: Hex) => {
  return remaining.findIndex((current) => HexUtils.equals(current, coords)) >= 0;
};

const App = () => {
  const { classes } = useStyles();
  const center: Hex = { q: 0, r: 0, s: 0 };

  const coordinates = GridGenerator.hexagon(RADIUS);

  const remainingTiles = new Set();

  remainingTiles.add(getID(center));
  remainingTiles.add(getID({ q: 1, r: -2, s: 1 }));
  remainingTiles.add(getID({ q: -1, r: 2, s: 2 }));
  remainingTiles.add(getID({ q: -1, r: -2, s: 3 }));
  remainingTiles.add(getID({ q: 0, r: 2, s: -2 }));
  remainingTiles.add(getID({ q: 1, r: 1, s: -2 }));
  remainingTiles.add(getID({ q: 1, r: 2, s: -3 }));
  remainingTiles.add(getID({ q: 2, r: 2, s: -4 }));
  remainingTiles.add(getID({ q: 3, r: 2, s: -5 }));
  remainingTiles.add(getID({ q: 2, r: -2, s: 0 }));
  remainingTiles.add(getID({ q: -3, r: 2, s: 1 }));
  remainingTiles.add(getID({ q: 0, r: -1, s: 1 }));
  remainingTiles.add(getID({ q: -1, r: 0, s: 1 }));

  const Tile = ({ hex }: TileProps) => {
    const id = HexUtils.getID(hex);
    const hasRemaining = remainingTiles.has(id);

    let cellStyles: CSSProperties = {
      fill: "#777",
    };

    if (hasRemaining) {
      cellStyles = {
        ...cellStyles,
        fill: "#CCC",
      };
    }
    const possibleNeighbours = HexUtils.neighbors(hex);
    let emptyAdjacentTiles = 6;
    possibleNeighbours.forEach((hex) => {
      if (remainingTiles.has(getID(hex))) {
        emptyAdjacentTiles--;
      }
    });

    return (
      <Hexagon {...hex} cellStyle={cellStyles} className={hasRemaining ? "glow" : ""}>
        <Text>{emptyAdjacentTiles}</Text>
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

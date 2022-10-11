import { useState } from 'react';
import { Hex, HexUtils } from 'react-hexgrid';
import { Rune } from '../Rune.enum';

const createCoord = (q: number, r: number) =>
  HexUtils.getID(new Hex(q, r, -q - r));

export const useCoords = () => {
  const [pattern1] = useState({
    [createCoord(0, 0)]: '',
    [createCoord(1, 0)]: '',
    [createCoord(1, -1)]: '',
    [createCoord(0, -1)]: '',
    [createCoord(-1, 0)]: '',
    [createCoord(-1, 1)]: '',
    [createCoord(0, 1)]: '',
    [createCoord(-2, 2)]: '',
    [createCoord(-2, 0)]: '',
    [createCoord(2, 0)]: '',
    [createCoord(2, -2)]: '',
    [createCoord(-2, -1)]: '',
    [createCoord(-2, 3)]: '',
    [createCoord(2, 1)]: '',
    [createCoord(2, -3)]: '',
    [createCoord(3, -1)]: '',
    [createCoord(3, -2)]: '',
    [createCoord(-3, 1)]: '',
    [createCoord(-3, 2)]: '',
    [createCoord(0, 2)]: '',
    [createCoord(0, -2)]: '',
    [createCoord(1, -3)]: '',
    [createCoord(-1, 3)]: '',
    [createCoord(-1, -2)]: '',
    [createCoord(1, 2)]: '',
    [createCoord(3, -4)]: '',
    [createCoord(4, -4)]: '',
    [createCoord(4, -3)]: '',
    [createCoord(4, -1)]: '',
    [createCoord(4, 0)]: '',
    [createCoord(3, 1)]: '',
    [createCoord(1, 3)]: '',
    [createCoord(0, 4)]: '',
    [createCoord(-1, 4)]: '',
    [createCoord(-3, 4)]: '',
    [createCoord(-4, 4)]: '',
    [createCoord(-4, 3)]: '',
    [createCoord(-4, 1)]: '',
    [createCoord(-4, 0)]: '',
    [createCoord(-3, -1)]: '',
    [createCoord(-1, -3)]: '',
    [createCoord(0, -4)]: '',
    [createCoord(1, -4)]: '',
    [createCoord(5, -4)]: '',
    [createCoord(4, -5)]: '',
    [createCoord(1, -5)]: '',
    [createCoord(-1, -4)]: '',
    [createCoord(-4, -1)]: '',
    [createCoord(-5, 1)]: '',
    [createCoord(-5, 4)]: '',
    [createCoord(-4, 5)]: '',
    [createCoord(-1, 5)]: '',
    [createCoord(1, 4)]: '',
    [createCoord(4, 1)]: '',
    [createCoord(5, -1)]: ''
  });

  const [pattern2] = useState({
    [createCoord(0, 0)]: Rune.Titanium,
    [createCoord(-5, 5)]: Rune.Magnesium,
    [createCoord(-4, 5)]: Rune.Light,
    [createCoord(-3, 5)]: Rune.Shadow,
    [createCoord(-2, 5)]: Rune.Copper,
    [createCoord(-1, 5)]: Rune.Zinc,
    [createCoord(0, 5)]: Rune.Air,
    [createCoord(1, 4)]: Rune.Quicksilver,
    [createCoord(2, 3)]: Rune.Iron,
    [createCoord(3, 2)]: Rune.Platinum,
    [createCoord(4, 1)]: Rune.Platinum,
    [createCoord(5, 0)]: Rune.Water,
    [createCoord(5, -1)]: Rune.Water,
    [createCoord(5, -2)]: Rune.Water,
    [createCoord(5, -3)]: Rune.Platinum,
    [createCoord(5, -4)]: Rune.Platinum,
    [createCoord(5, -5)]: Rune.Elemental,
    [createCoord(4, -5)]: Rune.Elemental,
    [createCoord(3, -5)]: Rune.Elemental,
    [createCoord(2, -5)]: Rune.Elemental,
    [createCoord(1, -5)]: Rune.Elemental,
    [createCoord(0, -5)]: Rune.Earth,
    [createCoord(-1, -4)]: Rune.Earth,
    [createCoord(-2, -3)]: Rune.Earth,
    [createCoord(-3, -2)]: Rune.Earth,
    [createCoord(-4, -1)]: Rune.Earth,
    [createCoord(-5, 0)]: Rune.Fire,
    [createCoord(-5, 1)]: Rune.Magnesium,
    [createCoord(-5, 2)]: Rune.Light,
    [createCoord(-5, 3)]: Rune.Shadow,
    [createCoord(-5, 4)]: Rune.Copper,
    [createCoord(-4, 2)]: Rune.Zinc,
    [createCoord(-3, 2)]: Rune.Air,
    [createCoord(-2, 2)]: Rune.Quicksilver,
    [createCoord(-1, 2)]: Rune.Iron,
    [createCoord(0, 2)]: Rune.Platinum,
    [createCoord(-2, 4)]: Rune.Magnesium,
    [createCoord(-1, 3)]: Rune.Light,
    [createCoord(1, 1)]: Rune.Shadow,
    [createCoord(2, 0)]: Rune.Copper,
    [createCoord(2, 2)]: Rune.Zinc,
    [createCoord(2, 1)]: Rune.Air,
    [createCoord(2, -1)]: Rune.Quicksilver,
    [createCoord(2, -2)]: Rune.Iron,
    [createCoord(4, -2)]: Rune.Platinum,
    [createCoord(3, -2)]: Rune.Copper,
    [createCoord(1, -2)]: Rune.Copper,
    [createCoord(0, -2)]: Rune.Copper,
    [createCoord(2, -4)]: Rune.Copper,
    [createCoord(1, -3)]: Rune.Air,
    [createCoord(-1, -1)]: Rune.Air,
    [createCoord(-2, 0)]: Rune.Air,
    [createCoord(-2, -2)]: Rune.Air,
    [createCoord(-2, -1)]: Rune.Air,
    [createCoord(-2, 1)]: Rune.Air
  });

  const [pattern3] = useState({
    [createCoord(0, 0)]: Rune.Titanium,
    [createCoord(5, -5)]: Rune.Fire,
    [createCoord(-5, 5)]: Rune.Fire,
    [createCoord(1, 3)]: Rune.Platinum,
    [createCoord(3, 1)]: Rune.Zinc,
    [createCoord(4, -5)]: Rune.Copper,
    [createCoord(-2, -3)]: Rune.Iron,
    [createCoord(-4, 2)]: Rune.Magnesium,
    [createCoord(5, -3)]: Rune.Shadow,
    [createCoord(-3, -1)]: Rune.Shadow,
    [createCoord(-5, 4)]: Rune.Shadow,
    [createCoord(0, 5)]: Rune.Shadow,
    [createCoord(3, -5)]: Rune.Light,
    [createCoord(0, -5)]: Rune.Light,
    [createCoord(-4, 0)]: Rune.Light,
    [createCoord(5, -1)]: Rune.Light,
    [createCoord(1, 4)]: Rune.Quicksilver,
    [createCoord(4, -1)]: Rune.Quicksilver,
    [createCoord(3, -4)]: Rune.Quicksilver,
    [createCoord(0, -4)]: Rune.Quicksilver,
    [createCoord(-4, 4)]: Rune.Quicksilver,
    [createCoord(-1, 4)]: Rune.Fire,
    [createCoord(-2, 5)]: Rune.Fire,
    [createCoord(-1, -4)]: Rune.Fire,
    [createCoord(1, -4)]: Rune.Fire,
    [createCoord(5, -4)]: Rune.Water,
    [createCoord(2, -5)]: Rune.Water,
    [createCoord(-5, 0)]: Rune.Water,
    [createCoord(-5, 2)]: Rune.Water,
    [createCoord(2, 2)]: Rune.Water,
    [createCoord(4, 1)]: Rune.Water,
    [createCoord(4, -3)]: Rune.Earth,
    [createCoord(-1, -3)]: Rune.Earth,
    [createCoord(-4, -1)]: Rune.Earth,
    [createCoord(-5, 1)]: Rune.Earth,
    [createCoord(-4, 3)]: Rune.Earth,
    [createCoord(-3, 5)]: Rune.Earth,
    [createCoord(3, 2)]: Rune.Air,
    [createCoord(0, 4)]: Rune.Air,
    [createCoord(-4, 5)]: Rune.Air,
    [createCoord(-3, -2)]: Rune.Air,
    [createCoord(1, -5)]: Rune.Air,
    [createCoord(4, -4)]: Rune.Air,
    [createCoord(5, 0)]: Rune.Elemental,
    [createCoord(4, -2)]: Rune.Elemental,
    [createCoord(-2, -2)]: Rune.Elemental,
    [createCoord(-5, 3)]: Rune.Elemental,
    [createCoord(5, -2)]: Rune.Fire,
    [createCoord(2, 3)]: Rune.Fire,
    [createCoord(-1, 5)]: Rune.Water,
    [createCoord(-3, 4)]: Rune.Water,
    [createCoord(4, 0)]: Rune.Earth,
    [createCoord(2, -4)]: Rune.Earth,
    [createCoord(-4, 1)]: Rune.Air,
    [createCoord(-2, 4)]: Rune.Air
  });

  return { pattern1, pattern2, pattern3 };
};

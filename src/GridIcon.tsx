import { Rune } from './Rune.enum';
import { RuneIcon } from './RuneIcon';

type GridIconProps = {
  rune: Rune;
  size: number;
  x: number;
  y: number;
};

export const GridIcon = ({ rune, size, x, y }: GridIconProps) => {
  const offset = size / 2;
  return (
    <g transform={`translate(${x - offset} ${y - offset})`}>
      <RuneIcon rune={rune} size={size} />
    </g>
  );
};

import { Hex, HexUtils } from 'react-hexgrid';
import { useLayoutContext } from 'react-hexgrid/lib/Layout';
import { Rune } from '../Rune.enum';
import { RuneIcon } from './RuneIcon';

type GridIconProps = {
  rune: Rune;
  size: number;
  hex: Hex;
  onClick: () => void;
};

export const GridIcon = ({ rune, size, hex, onClick }: GridIconProps) => {
  const offset = size / 2;
  const { layout } = useLayoutContext();

  const pixel = HexUtils.hexToPixel(hex, layout);

  return (
    <g
      transform={`translate(${pixel.x - offset} ${pixel.y - offset})`}
      className={`${HexUtils.getID(hex)} available`}
      onClick={onClick}
    >
      <RuneIcon rune={rune} size={size} />
    </g>
  );
};

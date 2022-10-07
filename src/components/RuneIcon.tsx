import {
  Icon3dCubeSphere,
  IconDroplet,
  IconFlame,
  IconLayoutAlignBottom,
  IconLetterT,
  IconMoon,
  IconPlant,
  IconRipple,
  IconSun,
  IconTallymark1,
  IconTallymark2,
  IconTallymark3,
  IconTallymark4,
  IconTallymarks
} from '@tabler/icons';
import { get } from 'lodash';
import { Rune } from '../Rune.enum';

type RuneIconProps = {
  rune: Rune;
  size?: string | number;
};

export const RuneIcon = ({ rune, size }: RuneIconProps) => {
  const iconLookup = {
    [Rune.Earth]: <IconPlant size={size} />,
    [Rune.Water]: <IconDroplet size={size} />,
    [Rune.Fire]: <IconFlame size={size} />,
    [Rune.Air]: <IconRipple size={size} />,
    [Rune.Elemental]: <Icon3dCubeSphere size={size} />,
    [Rune.Light]: <IconSun size={size} />,
    [Rune.Shadow]: <IconMoon size={size} />,
    [Rune.Quicksilver]: <IconLayoutAlignBottom size={size} />,
    [Rune.Magnesium]: <IconTallymark1 size={size} />,
    [Rune.Iron]: <IconTallymark2 size={size} />,
    [Rune.Copper]: <IconTallymark3 size={size} />,
    [Rune.Zinc]: <IconTallymark4 size={size} />,
    [Rune.Platinum]: <IconTallymarks size={size} />,
    [Rune.Titanium]: <IconLetterT size={size} />
  };

  return get(iconLookup, rune);
};

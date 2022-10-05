import { Rune } from './Rune.enum';
import {
  IconPlant,
  IconDroplet,
  IconFlame,
  IconRipple,
  Icon3dCubeSphere,
  IconSun,
  IconMoon,
  IconLayoutAlignBottom,
  IconTallymark1,
  IconTallymark2,
  IconTallymark3,
  IconTallymark4,
  IconTallymarks,
  IconLetterT
} from '@tabler/icons';
import { ThemeIcon } from '@mantine/core';
import { get } from 'lodash';

type RuneIconProps = {
  rune: Rune;
};

export const RuneIcon = ({ rune }: RuneIconProps) => {
  const iconLookup = {
    [Rune.Earth]: <IconPlant />,
    [Rune.Water]: <IconDroplet />,
    [Rune.Fire]: <IconFlame />,
    [Rune.Air]: <IconRipple />,
    [Rune.Elemental]: <Icon3dCubeSphere />,
    [Rune.Light]: <IconSun />,
    [Rune.Shadow]: <IconMoon />,
    [Rune.Quicksilver]: <IconLayoutAlignBottom />,
    [Rune.Magnesium]: <IconTallymark1 />,
    [Rune.Iron]: <IconTallymark2 />,
    [Rune.Copper]: <IconTallymark3 />,
    [Rune.Zinc]: <IconTallymark4 />,
    [Rune.Platinum]: <IconTallymarks />,
    [Rune.Titanium]: <IconLetterT />
  };

  const gradientLookup = {
    [Rune.Earth]: { from: 'green', to: 'lime' },
    [Rune.Water]: { from: 'blue', to: 'cyan' },
    [Rune.Fire]: { from: 'red', to: 'yellow' },
    [Rune.Air]: { from: 'gray', to: '#7AE' },
    [Rune.Elemental]: { from: '#77A', to: '#B88' },
    [Rune.Light]: { from: '#dd9f88', to: '#ddcc88' },
    [Rune.Shadow]: { from: 'black', to: '#BBB' },
    [Rune.Quicksilver]: { from: '#597e8d', to: '#9e9e9e' },
    [Rune.Magnesium]: { from: '#9a9ea3', to: '#9a9ea3' },
    [Rune.Iron]: { from: '#625e59', to: '#625e59' },
    [Rune.Copper]: { from: '#B77333', to: '#B77333' },
    [Rune.Zinc]: { from: '#4c4c49', to: '#4c4c49' },
    [Rune.Platinum]: { from: '#95978e', to: '#95978e' },
    [Rune.Titanium]: { from: '#cdcdcd', to: '#dedede' }
  };

  return (
    <ThemeIcon
      id={rune}
      radius="lg"
      size="lg"
      variant="gradient"
      gradient={get(gradientLookup, rune)}
    >
      {get(iconLookup, rune)}
    </ThemeIcon>
  );
};

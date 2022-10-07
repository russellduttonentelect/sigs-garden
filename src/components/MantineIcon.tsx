import { ThemeIcon } from '@mantine/core';
import { get } from 'lodash';
import { Rune } from '../Rune.enum';
import { RuneIcon } from './RuneIcon';

type MantineIconProps = {
  rune: Rune;
};

export const MantineIcon = ({ rune }: MantineIconProps) => {
  const gradientLookup = {
    [Rune.Earth]: { from: 'green', to: '#82c91e' },
    [Rune.Water]: { from: 'blue', to: 'cyan' },
    [Rune.Fire]: { from: 'red', to: '#fab005' },
    [Rune.Air]: { from: 'indigo', to: '#7AE' },
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
      radius="lg"
      size="lg"
      variant="gradient"
      gradient={get(gradientLookup, rune)}
    >
      <RuneIcon rune={rune} />
    </ThemeIcon>
  );
};

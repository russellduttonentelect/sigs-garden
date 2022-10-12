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
import React from 'react';
import { Rune } from '../Rune.enum';

type RuneIconProps = {
  rune: Rune;
  size?: string | number;
};

export const RuneIcon = React.memo(({ rune, size }: RuneIconProps) => {
  const iconLookup = {
    [Rune.Earth]: <IconPlant size={size} filter="url(#shadow)" />,
    [Rune.Water]: <IconDroplet size={size} filter="url(#shadow)" />,
    [Rune.Fire]: <IconFlame size={size} filter="url(#shadow)" />,
    [Rune.Air]: <IconRipple size={size} filter="url(#shadow)" />,
    [Rune.Elemental]: <Icon3dCubeSphere size={size} filter="url(#shadow)" />,
    [Rune.Light]: <IconSun size={size} filter="url(#shadow)" />,
    [Rune.Shadow]: <IconMoon size={size} filter="url(#shadow)" />,
    [Rune.Quicksilver]: (
      <IconLayoutAlignBottom size={size} filter="url(#shadow)" />
    ),
    [Rune.Magnesium]: <IconTallymark1 size={size} filter="url(#shadow)" />,
    [Rune.Iron]: <IconTallymark2 size={size} filter="url(#shadow)" />,
    [Rune.Copper]: <IconTallymark3 size={size} filter="url(#shadow)" />,
    [Rune.Zinc]: <IconTallymark4 size={size} filter="url(#shadow)" />,
    [Rune.Platinum]: <IconTallymarks size={size} filter="url(#shadow)" />,
    [Rune.Titanium]: <IconLetterT size={size} filter="url(#shadow)" />
  };

  return get(iconLookup, rune);
});

import { Rune } from './Rune.enum';

export const isBaseElementMatch = (activeType: Rune, selectedType: Rune) => {
  const baseElements = new Set([Rune.Air, Rune.Water, Rune.Earth, Rune.Fire]);
  if (!baseElements.has(activeType) || !baseElements.has(selectedType)) {
    return false;
  }

  return activeType === selectedType;
};

export const isElementalMatch = (activeType: Rune, selectedType: Rune) => {
  const baseElements = new Set([
    Rune.Air,
    Rune.Water,
    Rune.Earth,
    Rune.Fire,
    Rune.Elemental
  ]);
  if (!baseElements.has(activeType) || !baseElements.has(selectedType)) {
    return false;
  }

  return activeType === Rune.Elemental || selectedType === Rune.Elemental;
};

export const isLightShadowMatch = (activeType: Rune, selectedType: Rune) => {
  const lightShadow = new Set([Rune.Shadow, Rune.Light]);

  if (!lightShadow.has(activeType) || !lightShadow.has(selectedType)) {
    return false;
  }

  return activeType !== selectedType;
};

export const isMetalMatch = (activeType: Rune, selectedType: Rune) => {
  const metals = new Set([
    Rune.Magnesium,
    Rune.Iron,
    Rune.Copper,
    Rune.Zinc,
    Rune.Platinum,
    Rune.Quicksilver
  ]);

  if (!metals.has(activeType) || !metals.has(selectedType)) {
    return false;
  }

  if (activeType === Rune.Quicksilver && selectedType === Rune.Quicksilver) {
    return false;
  }

  return activeType === Rune.Quicksilver || selectedType === Rune.Quicksilver;
};

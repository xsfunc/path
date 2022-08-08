import { formatHex, useMode, modeRgb, modeLch } from "culori/fn";
import {
  createHueShiftPalette,
  createScientificPalettes,
} from "./scientificPalettes";

const rgb = useMode(modeRgb);
const lch = useMode(modeLch);

export function updateAndFormat(baseColor, config) {
  return formatHex({
    ...baseColor,
    ...config,
  });
}

export function allPalettes(baseColor) {
  const palettes = createScientificPalettes(baseColor);
  return Object.entries(palettes);
}

export function scientificPalettes(baseColor) {
  const palettes = createScientificPalettes(baseColor);
  return Object.entries(palettes).map(([key, value]) => {
    return [key, value.map((colorLCH) => formatHex(colorLCH))];
  });
}

// @ts-ignore
export function hueShift(
  base,
  minLightness = 10,
  maxLightness = 90,
  hueStep = 12
) {
  const hueShiftPalette = createHueShiftPalette({
    base,
    minLightness,
    maxLightness,
    hueStep,
  });

  return hueShiftPalette.map((color) => formatHex(color));
}

function adjustHue(value) {
  if (value < 0) value += Math.ceil(-value / 360) * 360;
  return value % 360;
}

export function createScientificPalettes(baseColor) {
  const targetHueSteps = {
    analogous: [0, 30, 60],
    triadic: [0, 120, 240],
    tetradic: [0, 90, 180, 270],
    complementary: [0, 180],
    splitComplementary: [0, 150, 210],
  };

  const palettes = {};

  for (const type of Object.keys(targetHueSteps)) {
    palettes[type] = targetHueSteps[type].map((step) => ({
      l: baseColor.l,
      c: baseColor.c,
      h: adjustHue(baseColor.h + step),
      mode: "lch",
    }));
  }

  return palettes;
}

function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

export function createHueShiftPalette(opts) {
  const { base, minLightness, maxLightness, hueStep } = opts;

  const palette = [base];

  for (let i = 1; i < 5; i++) {
    const hueDark = adjustHue(base.h - hueStep * i);
    const hueLight = adjustHue(base.h + hueStep * i);
    const lightnessDark = map(i, 0, 4, base.l, minLightness);
    const lightnessLight = map(i, 0, 4, base.l, maxLightness);
    const chroma = base.c;

    palette.push({
      l: lightnessDark,
      c: chroma,
      h: hueDark,
      mode: "lch",
    });

    palette.unshift({
      l: lightnessLight,
      c: chroma,
      h: hueLight,
      mode: "lch",
    });
  }

  return palette;
}

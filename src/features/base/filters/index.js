export const blur =
  (...deviation) =>
  (add) =>
    add.gaussianBlur(...deviation).css("color-interpolation-filters", "sRGB");

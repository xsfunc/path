export function grainLayer(root) {
  const grain = root.rect(100, 100).css({ "mix-blend-mode": "overlay" });
  grain.filterWith((add) => {
    add
      .turbulence(6, 3, fxrand(), "stitch", "fractalNoise")
      .colorMatrix(
        "matrix",
        ".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"
      );
  });
}

import { blur } from "../../base/filters";

export class Rainbow {
  constructor(root) {
    const { colors, blurDeviation, size, center, width } = root.scheme.rainbow;
    const mask = root.mask();

    mask
      .circle(size)
      .center(...center)
      .fill("white")
      .filterWith(blur(blurDeviation));
    mask
      .circle(size - colors.length * size * width)
      .center(...center)
      .filterWith(blur(blurDeviation));

    for (let i = 0; i < colors.length; i++) {
      root
        .circle(size - i * size * width)
        .center(...center)
        .fill(colors[i])
        .opacity(0.3)
        .filterWith(blur(blurDeviation))
        .maskWith(mask);
    }
  }
}

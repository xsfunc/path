import { random, randomInt, randomSample } from "../../utils/random";

export function leavesComposition(root) {
  const { colors: leaveColors } = root.scheme.leaves;
  const { windDirection } = root.scheme;
  const leavesCount = randomInt(150, 250);

  for (let i = 0; i < leavesCount; i++) {
    const skewAmount = random(0, 30) * windDirection;
    const color = randomSample(leaveColors);
    root
      .ellipse(5, 1.5)
      .skew(skewAmount, 0, 0)
      .center(random(0, 95), random(0, 100))
      .fill(color)
      .opacity(random(0.2, 1))
      .filterWith((add) =>
        add
          .width("300%")
          .height("300%")
          .dmove("-100%", "-100%")
          .gaussianBlur(random(0.5, 2), random(0.1, 1))
          .css("color-interpolation-filters", "sRGB")
      );
  }
}

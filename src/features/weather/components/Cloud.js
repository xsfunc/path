import { spline } from "@georgedoescode/generative-utils";
import { random, randomInt } from "../../../utils/random";
import { generateGradient } from "../../../utils";
import { Path } from "@svgdotjs/svg.js";

export class Cloud extends Path {
  constructor(root, options = {}) {
    super();
    const { peakCountMin = 6, peakCountMax = 8, height = 10 } = options;
    const peakCount = randomInt(peakCountMin, peakCountMax);
    const cloudGradient = generateGradient("linear", [
      ["#eff6ee", 0, 0.5],
      ["white", 0.7, 0.3],
      ["#eff6ee", 1, 0.1],
    ])
      .from(0, 0)
      .to(0, 1)
      .addTo(root);

    const points = [{ x: 0, y: height }];
    for (let index = 1; index < peakCount; index++) {
      const y =
        index % 2 != 0 ? random(height / 2, height) : random(1, height / 3);
      points.push({
        x: index * 10,
        y,
      });
    }
    points.push({ x: peakCount * 10, y: height });
    const pathLine = spline(points, 1, false);
    this.addTo(root).plot(pathLine).fill(cloudGradient);
  }
}

import { G } from "@svgdotjs/svg.js";
import { generateGradient } from "../../../utils";
import { random, randomInt } from "../../../utils/random";

export class SunBig extends G {
  constructor(root) {
    super();
    const { colors } = root.scheme.sun;

    this.radius = randomInt(40, 90);
    this.sunX = randomInt(20, 35);
    this.suynY = randomInt(30, 60);
    this.lightGradient = generateGradient("radial", [
      [colors[0], 0],
      [colors[1], random(0.4, 0.6)],
      [colors[0], 0.7, 0],
    ]).addTo(this);

    this.circle(this.radius)
      .center(this.sunX, this.suynY)
      .fill(this.lightGradient);
  }
}

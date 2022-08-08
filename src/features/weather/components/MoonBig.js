import { G } from "@svgdotjs/svg.js";
import { generateGradient } from "../../../utils";
import { random, randomInt } from "../../../utils/random";

export class MoonBig extends G {
  constructor() {
    super();
    this.radius = randomInt(20, 60);
    this.sunX = randomInt(20, 80);
    this.suynY = randomInt(30, 40);
    this.lightGradient = generateGradient("radial", [
      ["white", 0, 0.5],
      ["white", random(0.9, 0.95)],
      ["#e9e9e9", 1, 0],
    ]).addTo(this);

    this.circle(this.radius)
      .center(this.sunX, this.suynY)
      .fill(this.lightGradient);
  }
}

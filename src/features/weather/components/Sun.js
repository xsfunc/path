import { G } from "@svgdotjs/svg.js";
import { generateGradient } from "../../../utils";
import { randomInt, randomSample, randomSide } from "../../../utils/random";

export class Sun extends G {
  constructor(root) {
    super();

    this.radius = randomInt(20, 45);
    this.cx = randomInt(20, 80);
    this.cy = randomInt(10, 40);

    const { colors } = root.scheme.sun;
    const [xFrom, xTo] = randomSample([
      [0, 1],
      [1, 0],
    ]);
    const sunGradient = generateGradient("linear", [
      [colors[4], 0],
      [colors[1], 0.8, 0],
    ])
      .from(xFrom, 0)
      .to(xTo, 1)
      .addTo(this);

    const sunLightGradient = generateGradient("linear", [
      [colors[2], 0],
      [colors[0], 0.8, 0],
    ])
      .from(xFrom, 0)
      .to(xTo, 1)
      .addTo(this);

    this.circle(this.radius).center(this.cx, this.cy).fill(sunGradient);

    const sunLight = root
      .circle(this.radius * 1.05)
      .center(this.cx, this.cy)
      .fill(sunLightGradient)
      .opacity(0.6);

    sunLight.filterWith((add) => add.gaussianBlur(2));
  }
}

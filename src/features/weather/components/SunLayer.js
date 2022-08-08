import { G } from "@svgdotjs/svg.js";
import { generateGradient } from "../../../utils";
import { randomInt } from "../../../utils/random";
import { blur } from "../../base/filters";

export class SunLayer extends G {
  constructor(root) {
    super();
    this.radius = randomInt(15, 35);
    this.cx = randomInt(20, 80);
    this.cy = randomInt(25, 40);

    const { colors } = root.scheme.sun;
    const layersCount = 3;
    const gradient = generateGradient("linear", [
      [colors[1], 0],
      [colors[2], 0.8],
    ])
      .from(1, 0)
      .to(0, 1)
      .addTo(this);

    for (let index = layersCount; index > 0; index--) {
      root
        .circle(this.radius + index * 7)
        .center(this.cx, this.cy)
        .fill(gradient)
        .opacity(1 / index - 0.2)
        .filterWith(blur(index / 3));
    }
  }
}

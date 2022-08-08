import { G } from "@svgdotjs/svg.js";
import { spline } from "@georgedoescode/generative-utils";
import { random, randomInt } from "../../../utils/random";
import { blur } from "../filters";

export class Glade extends G {
  constructor({ hillCountMax, hillCountMin, height, volatility }) {
    super();
    this.hillCount = randomInt(hillCountMin, hillCountMax);

    const points = [];
    for (let index = 0; index < this.hillCount; index++) {
      points.push({
        x: (index * 120) / (this.hillCount - 1) - 10,
        y: random(100 - height - volatility, 100 - height),
      });
    }

    const pathLine = spline(points, 1, false);
    const closePath = "L110,100 L-10,100 Z";
    this.treePath = this.path(pathLine).fill("transparent");

    this.gladePath = this.path(pathLine.concat(closePath));
  }

  mirror(color, dH = 0, dS = 10, dL = -10) {
    const height = this.gladePath.bbox().height;

    this.gladePath
      .clone()
      .dy(height)
      .flip("y")
      .addTo(this)
      .fill(color)
      .filterWith(blur(0.4));

    return this;
  }
}

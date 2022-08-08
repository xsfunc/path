import { spline } from "@georgedoescode/generative-utils";
import { SimpleTree } from "./SimpleTree";
import { generateGradient } from "../../../utils";
import { random, randomInt } from "../../../utils/random";

export class Hill {
  constructor(draw, dy = 0) {
    this.draw = draw;

    const pointsCount = randomInt(3, 6);
    const points = [];

    for (let index = 0; index < pointsCount; index++) {
      points.push({
        x: (index * 100) / (pointsCount - 1),
        y: random(50, 66) + index * 4,
      });
    }

    const pathLine = spline(points, 1, false);
    const closePath = "L100,100 L0,100 Z";

    this.path = draw.path(pathLine).fill("transparent").dmove(0, dy);

    const gradient = generateGradient("linear", [
      ["#88d4ab", 0],
      ["#14746f", 1],
    ]);

    const hill = draw
      .path(pathLine.concat(closePath))
      .fill(dy ? gradient : "#88d4ab")
      .dmove(0, dy);
  }

  addTree(prev, current) {
    const pathLength = this.path.length();
    const prevPoint = this.path.pointAt((pathLength / 100) * prev);
    const point = this.path.pointAt((pathLength / 100) * current);

    const [prevX, prevY] = prevPoint.toArray();
    const [x, y] = point.toArray();

    if (prevY > y && x - prevX < 5) return;
    new SimpleTree(this.draw).move(x, y);
  }
}

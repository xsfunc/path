import { G } from "@svgdotjs/svg.js";
import {
  random,
  randomSample,
  createWeightedSelector,
} from "../../../utils/random";

const items = [
  {
    weight: 5,
    value: 1.9,
  },
  {
    weight: 50,
    value: 3,
  },
  {
    weight: 50,
    value: random(3, 4),
  },
  {
    weight: 5,
    value: 5,
  },
  {
    weight: 5,
    value: 7,
  },
];

const pickWeight = createWeightedSelector(items);

export class ForestTree extends G {
  constructor(root) {
    super();
    this.width = pickWeight() * 1;

    const height = 110;
    if (this.width > 1)
      for (let i = 0; i < 1; i++) {
        const side = randomSample([1, -1]);
        const branchHeight = random(5, 40);
        const branchLenght = random(1.5, 2) * this.width;
        const branchWidth = this.width / 6;
        const branchAngle = random(-55, -40) * side;

        this.polygon()
          .plot([
            [0, branchHeight],
            [side * branchLenght, branchHeight],
            [side * branchLenght, branchHeight + 0.3],
            [0, branchHeight + branchWidth + 1],
          ])
          .rotate(branchAngle, 0, branchHeight + branchWidth);

        this.circle(0.5)
          .fill("red")
          .center(0, branchHeight + branchWidth + 1)
          .hide();
      }

    this.trunk = this.polygon()
      .plot([
        [0, height],
        [this.width / 4, -2],
        [this.width * 0.75, -2],
        [this.width, height],
      ])
      .center(0, height / 2 - 5);
  }
}

import { Star } from "./Star";
import { StarLine } from "./StarLine";
import { randomInt, randomSide } from "../../../utils/random";
import { G } from "@svgdotjs/svg.js";

export class Stars extends G {
  constructor(root) {
    super();

    const starsCount = randomInt(30, 130);
    for (let i = 0; i < starsCount; i++) {
      new Star().addTo(this);
    }

    const starLinesCount = randomInt(0, 4);
    const side = randomSide();
    for (let index = 0; index < starLinesCount; index++)
      new StarLine(root, side);
  }
}

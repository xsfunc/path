import { Polygon } from "@svgdotjs/svg.js";
import { random } from "../../../utils/random";

export class SimpleTree extends Polygon {
  constructor(root) {
    super();
    this.heights = random(4, 7);

    const leftX = 0;
    const rightX = random(3, 3);
    const midHighX = (rightX - leftX) / 2;

    const lowY = 2 + this.heights;
    const highY = 0;

    this.plot([leftX, lowY, rightX, lowY, midHighX, highY]);
  }
}

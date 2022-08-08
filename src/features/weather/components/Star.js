import { Circle } from "@svgdotjs/svg.js";
import { random } from "../../../utils/random";

export class Star extends Circle {
  constructor() {
    super();
    const size = random(0, 0.15);
    const cx = random(0, 100);
    const cy = random(0, 40);
    this.center(cx, cy).radius(size).fill("white").opacity(random());
  }
}

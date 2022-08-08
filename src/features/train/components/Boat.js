import { G } from "@svgdotjs/svg.js";
import { blur } from "../../base/filters";

export class Boat extends G {
  constructor() {
    super();

    this.polygon([
      [5, 0],
      [8, 8],
      [1, 8],
    ]);

    this.polygon([
      [0, 0],
      [10, 0],
      [8, 2],
      [2, 2],
    ]).dy(8.7);
  }

  mirror() {
    this.clone()
      .flip("y", { x: 0, y: 11 })
      .addTo(this)
      .opacity(0.2)
      .filterWith(blur(0.4));
    return this;
  }
}

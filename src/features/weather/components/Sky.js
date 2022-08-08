import { Rect } from "@svgdotjs/svg.js";
import { generateGradient } from "../../../utils";

export class Sky extends Rect {
  constructor(root) {
    super();

    const { gradientType = "linear", stops } = root.scheme.sky;
    const gradient = generateGradient(gradientType, stops)
      .from(0, 0)
      .to(0, 1)
      .addTo(root);

    this.attr({
      width: 100,
      height: 100,
      fill: gradient,
    });
  }
}

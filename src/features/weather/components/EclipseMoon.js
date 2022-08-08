import { G } from "@svgdotjs/svg.js";
import { generateGradient } from "../../../utils";
import { randomInt } from "../../../utils/random";
import { blur } from "../../base/filters";

export class EclipseMoon extends G {
  constructor(root) {
    super();

    this.radius = randomInt(20, 30);
    this.sunX = randomInt(20, 35);
    this.suynY = randomInt(30, 40);
    this.lightGradient = generateGradient("radial", [
      ["white", 0],
      ["white", 1],
    ]).addTo(root);

    root
      .circle(this.radius)
      .center(this.sunX, this.suynY)
      .fill(this.lightGradient)
      .filterWith((add) => {
        add
          .width("300%")
          .height("300%")
          .dmove("-100%", "-100%")
          .gaussianBlur(2);
      });

    root
      .circle(this.radius * 0.95)
      .center(this.sunX, this.suynY)
      .opacity(0.8)
      .filterWith(blur(0.2));
  }
}

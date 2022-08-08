import { G } from "@svgdotjs/svg.js";
import { generateGradient } from "../../../utils";
import { random, randomInt, randomSide } from "../../../utils/random";
import { blur } from "../../base/filters";

export class Moon extends G {
  constructor(root) {
    super();

    const radius = randomInt(15, 20);
    const cx = randomInt(20, 80);
    const cy = randomInt(15, 25);
    const gradient = generateGradient("linear", [
      ["white", 0],
      ["white", 1],
    ])
      .from(1, 1)
      .to(0, 0)
      .addTo(root);

    const blurDeviation = 0.4;
    const transparentSize = radius / -random(4.5, 5.5);
    const mask = root.mask();
    mask
      .circle(radius)
      .center(cx, cy)
      .fill("white")
      .filterWith(blur(blurDeviation));
    mask
      .circle(radius)
      .center(cx, cy)
      .dmove(transparentSize * randomSide(), transparentSize)
      .fill("black")
      .opacity(0.9)
      .filterWith(blur(blurDeviation));
    root
      .circle(radius)
      .center(cx, cy)
      .fill(gradient)
      .maskWith(mask)
      .filterWith(blur(blurDeviation));
  }
}

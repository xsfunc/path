import { G } from "@svgdotjs/svg.js";
import { generateGradient } from "../../../utils";
import { random, randomInt } from "../../../utils/random";
import { blur } from "../../base/filters";

export class Bridge extends G {
  constructor(root) {
    super();

    const { bridge } = root.scheme;
    const { mainColors, shadowColors, fenceColor } = bridge;
    const deviation = 0.2;
    const spaceSize = randomInt(30, 50);
    const columnWidth = spaceSize * random(1.1, 1.4);

    const wallGradient = generateGradient("linear", [
      [mainColors[0], 0],
      [mainColors[1], 1],
    ])
      .from(0, 0)
      .to(0, 1)
      .addTo(this);
    const shadowGradient = generateGradient("linear", [
      [shadowColors[0], 1],
      [shadowColors[1], 0],
    ]).addTo(this);

    this.mask = root.mask();
    this.mask.rect(200, 200).fill("white").dmove(-50, -5);

    for (let i = -50; i < 150; i += columnWidth) {
      this.mask.circle(spaceSize).dmove(i, 10).filterWith(blur(deviation));
      this.mask
        .rect(spaceSize, 100)
        .dmove(i, 10 + spaceSize / 2)
        .filterWith(blur(deviation));
    }

    this.shadowMask = this.mask.clone().addTo(root);

    this.shadowMask.children().each(function () {
      this.dx(-1);
    });

    this.rect(200, 150).fill(shadowGradient).dx(-50).maskWith(this.shadowMask);

    // wall
    this.rect(200, 150).fill(wallGradient).dx(-50).maskWith(this.mask);
    // wall shadow line
    this.rect(200, 0.8).fill(shadowGradient).dmove(-50, 2);
    //fence
    // vertical lines
    const verticalStrokeGradient = generateGradient("linear", [
      [mainColors[0], 0],
      [mainColors[0], 0.3, 0],
    ])
      .from(0, 0)
      .to(1, 0)
      .addTo(this);

    for (let i = -50; i < 150; i += 10) {
      this.rect(0.5, 2)
        .fill(fenceColor)
        .stroke({ width: 0.1, color: verticalStrokeGradient })
        .dmove(i, -2);
    }

    this.rect(200, 0.5).fill(fenceColor).dmove(-50, -2);
    // horizontal light line
    this.rect(200, 0.2).fill(mainColors[0]).dmove(-50, -2);
  }

  dmove(x, y) {
    super.dmove(x, y);
    this.shadowMask.children().each(function () {
      this.dmove(x, y);
    });
    this.mask.children().each(function () {
      this.dmove(x, y);
    });
    return this;
  }
}

import { G } from "@svgdotjs/svg.js";
import { generateGradient } from "../../../utils";
import { randomSample } from "../../../utils/random";

export class Train extends G {
  constructor(root) {
    super();
    const { train: colors } = root.scheme;
    const [carriageX, carriageY] = [25, 8];
    const carriageSpace = 0.5;

    for (let i = 0; i < 120; i += carriageX + carriageSpace) {
      new Carriage(carriageX, carriageY, colors).addTo(this).dx(i);
    }
  }
}

class Carriage extends G {
  constructor(w, h, { lightWindowColor, darkWindowColor, carriageColor }) {
    super();

    const rimColor = generateGradient("linear", [
      [lightWindowColor, 0],
      [lightWindowColor, 0.4, 0],
    ])
      .from(0, 0)
      .to(0, 1)
      .addTo(this);

    this.rect(w, h)
      .fill(carriageColor)
      .stroke({ width: 0.15, color: rimColor })
      .radius(2);

    const windowsCount = 4;
    let i = 0;
    while (i < windowsCount) {
      this.rect(h / 2, h / 3)
        .radius(1)
        .dmove(3.5 * i + i * 2 + 2, h / 3)
        .fill(
          randomSample([lightWindowColor, darkWindowColor, darkWindowColor])
        );
      i++;
    }
  }
}

import { G } from "@svgdotjs/svg.js";
import { random } from "../../../utils/random";

export class Bird extends G {
  constructor() {
    super();
    const size = 5;
    const wingSize = size / 2;
    const wingAngle = random(2, 3);
    this.path(
      `M0 ${wingSize} Q ${wingSize / wingAngle} ${
        wingSize / wingAngle
      } ${wingSize} ${wingSize / 1.3}`
    )
      .fill("none")
      .stroke({ width: 0.1, color: "black", linecap: "round" })
      .opacity(0.3)

      .clone()
      .flip("x", { x: 0, y: 0 })
      .addTo(this);
  }
}

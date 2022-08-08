import { generateGradient } from "../../../utils";
import { random } from "../../../utils/random";

export class Rain {
  constructor(root) {
    const { windDirection } = root.scheme;
    const gradient = generateGradient("linear", [
      ["white", 0],
      ["white", 1, 0],
    ])
      .from(0, 1)
      .to(0, 0)
      .addTo(root);

    const angle = random(2, 5);
    for (let x = 0; x < 100; x += 5) {
      for (let y = 0; y < 100; y += 7) {
        const xLength = random(1, 10);
        const yLength = xLength * angle;
        const xr = random(0, 10) + x;
        const yr = random(0, 10) + y;
        const dx = xr + xLength * windDirection;
        const dy = yr + yLength;
        const blur = random(0, 0.3);
        root
          .line(xr, yr, dx, dy)
          .stroke({ width: 0.2, color: gradient, linecap: "round" })
          .opacity(0.15)
          .filterWith((add) => add.gaussianBlur(blur));
      }
    }
  }
}

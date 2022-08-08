import { Color } from "@svgdotjs/svg.js";
import { random, randomInt } from "../../../utils/random";

export class Cloud {
  constructor(draw) {
    this.x = random(5, 80);
    this.y = random(10, 50);
    this.cloudPartCount = randomInt(3, 4);
    this.lastCloudPartX = this.x;

    const color = new Color("#f8edeb");
    const maxCloudPartRadius = 8;
    const cloudParts = draw.group();

    for (let index = 0; index < this.cloudPartCount; index++) {
      const size = randomInt(5, maxCloudPartRadius);
      const dy = randomInt(-1, 1);

      cloudParts
        .circle(size)
        .center(this.lastCloudPartX, this.y + dy)
        .fill(color);
      const dx = random(1.2, 1.4);
      this.lastCloudPartX += size / dx;
    }

    const mask = draw
      .rect(cloudParts.width() + 2, maxCloudPartRadius)
      .move(cloudParts.x() - 1, this.y - maxCloudPartRadius)
      .fill("white");
    const line = draw
      .line(mask.x(), this.y, mask.x() + mask.width(), this.y)
      .stroke({ color, width: 1, linecap: "round" });

    cloudParts.maskWith(mask).fill(color);
    draw.group().add(cloudParts).add(line).opacity(0.7);
  }
}

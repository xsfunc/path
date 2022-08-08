import { spline } from "@georgedoescode/generative-utils";
import { G } from "@svgdotjs/svg.js";
import { generateGradient } from "../../../utils";
import { random, randomInt } from "../../../utils/random";
import { DAY_TIME } from "../../../constants";

export class Dune extends G {
  constructor(root, blur = false) {
    super();

    const peakPoint = { x: random(45, 55), y: random(82, 85) };
    const shadowWavesCount = randomInt(2, 4);
    const shadowPoints = [];

    let side = -1;
    let sideY = peakPoint.y;
    let shadowPointNumber = 1;
    while (shadowPointNumber <= shadowWavesCount) {
      sideY += (100 - peakPoint.y) / shadowWavesCount;
      const point = {
        x: peakPoint.x + side * random(2, 4.5) * shadowPointNumber,
        y: sideY,
      };
      shadowPoints.push(point);
      side *= -1;
      shadowPointNumber++;
    }
    shadowPoints.unshift(peakPoint);
    const shadowLine = spline(shadowPoints, 1, false);

    const { colors } = root.scheme.dune;
    const leftSideGradient = generateGradient("linear", [
      [colors[2], 0],
      [colors[6], 1],
    ])
      .from(0, 1)
      .to(1, 0)
      .addTo(this);

    // left side
    // control point coords
    const { time, sun } = root.scheme;
    const leftLineControlX = random(20, 25);
    const leftLineControlY = peakPoint.y * 1.1;
    const rimColor = time === DAY_TIME ? sun.colors[2] : "#e9e9e9";
    const rimGradient = generateGradient("linear", [
      [rimColor, 0.5, 0],
      [rimColor, 1],
    ])
      .from(0, 1)
      .to(1, 0)
      .addTo(this);

    const rim = this.path(
      `M0 100 Q ${leftLineControlX} ${leftLineControlY} ${peakPoint.x} ${peakPoint.y}`
    )
      .stroke({ width: 0.3, color: rimGradient, linecap: "round" })
      .fill("none");

    this.path(
      shadowLine +
        `H0 Q ${leftLineControlX} ${leftLineControlY} ${peakPoint.x} ${peakPoint.y}`
    ).fill(leftSideGradient);

    const lineWidth = random(0.1, 0.3);
    const linesCount = blur ? 0 : (100 - peakPoint.y) * 2;
    const lineGradient = generateGradient("linear", [
      [colors[8], 0],
      [colors[8], 1, 0],
    ])
      .from(0, 0)
      .to(1, 1)
      .addTo(root);

    for (let i = 1; i < linesCount; i++) {
      this.path(
        `M0 100 Q ${leftLineControlX} ${leftLineControlY} ${peakPoint.x} ${peakPoint.y}`
      )
        .dmove(i * 0.3, i * 0.5)
        .opacity(0.2)
        .fill("none")
        .stroke({ width: lineWidth, color: lineGradient });
    }

    const rightLineControlX = random(70, 75);
    const rightLineControlY = peakPoint.y * 1.2;

    const rightRimGradient = generateGradient("linear", [
      [rimColor, 0, 1],
      [rimColor, 0.5, 0],
    ])
      .from(0, 0)
      .to(1, 1)
      .addTo(this);

    this.path(
      `M100 100 Q ${rightLineControlX} ${rightLineControlY} ${peakPoint.x} ${peakPoint.y}`
    )
      .stroke({ width: 0.3, color: rightRimGradient })
      .fill("none");

    const righSideColor = generateGradient("linear", [
      [colors[8], 0],
      [colors[5], 1],
    ])
      .from(0, 0)
      .to(1, 1)
      .addTo(this);

    this.path(
      shadowLine +
        `H100 Q ${rightLineControlX} ${rightLineControlY} ${peakPoint.x} ${peakPoint.y}`
    ).fill(righSideColor);
  }
}

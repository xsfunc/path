import { Rain } from "./components/Rain";
import { Rainbow } from "./components/Rainbow";
import { Sky } from "./components/Sky";
import { Stars } from "./components/Stars";
import { random, randomInt } from "../../utils/random";
import { Cloud } from "./components/Cloud";
import { blur } from "../base/filters";
import { Bird } from "./components/Bird";
import { createVoronoiTessellation } from "@georgedoescode/generative-utils";

export function skyComposition(root) {
  const { eclipse, moon, sun, stars, rainbow } = root.scheme;
  new Sky(root).addTo(root);
  if (stars.enabled) new Stars(root).addTo(root);
  if (moon.enabled) new moon.factory(root).addTo(root);
  if (eclipse.enabled) new eclipse.factory(root).addTo(root);
  if (sun.enabled) new sun.factory(root).addTo(root);
  if (rainbow.enabled) new Rainbow(root);
  cloudsComposition(root);
}

export function cloudsComposition(root) {
  const { count, enabled } = root.scheme.clouds;
  if (!enabled) return;

  for (let i = 0; i < count; i++) {
    const size = random(0.5, 1);
    new Cloud(root)
      .x(randomInt(-10, 70))
      .y(i * 15)
      .scale(size)
      .filterWith(blur(1.3 - size));
  }
}

export function birdsComposition(root) {
  const { count, enabled } = root.scheme.birds;
  if (!enabled) return;
  const size = 30;
  const group = root.group();
  const points = [...Array(count)].map(() => {
    return {
      x: random(0, size),
      y: random(0, size),
    };
  });

  const tessellation = createVoronoiTessellation({
    relaxIterations: 1,
    width: size,
    height: size,
    points,
  });

  tessellation.cells.forEach((cell) => {
    new Bird()
      .center(cell.centroid.x, cell.centroid.y)
      .addTo(group)
      .filterWith(blur(0.1));
  });
  group.move(random(20, 70), random(10, 30));
}

export function rainComposition(root) {
  if (root.scheme.isRaining) new Rain(root);
}

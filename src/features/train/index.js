import { Bridge } from "./components/Bridge";
import { Glade } from "../base/components/Glade";
import { Train } from "./components/Train";
import { generateGradient } from "../../utils";
import { random, randomBool, randomInt, randomSide } from "../../utils/random";
import { blur } from "../base/filters";
import { Boat } from "./components/Boat";
import { treeOnPath } from "../base";
import { hueShift } from "../../utils/colors";

export function trainCompositon(root) {
  const { hills, horizon } = root.scheme;
  const { colors: gladeColors } = hills;

  const lakeY = 83;
  root.rect(100, 12).y(lakeY).fill(gladeColors[0]).opacity(0.7);

  for (let y = lakeY; y < 95; y++) {
    root.line(0, y, 100, y).stroke({
      width: 0.5,
      color: "white",
      opacity: 0.15,
      dasharray: [random(1, 4), random(1, 4), random(1, 4)],
    });
  }

  const hasTree = randomBool(70);
  const gladeCount = randomInt(4, 5);
  for (let i = gladeCount; i > 0; i--) {
    const strokeGradient = generateGradient("linear", [
      [gladeColors[0], 0],
      [gladeColors[i], 0.3, 0.3],
    ])
      .from(0, 0)
      .to(0, 1)
      .addTo(root);

    const gradient = generateGradient("linear", [
      [gladeColors[i], 0],
      [gladeColors[i + 2], 1],
    ])
      .from(0, 0)
      .to(0, 1)
      .addTo(root);

    const glade = new Glade({
      hillCountMax: 7,
      hillCountMin: 5,
      height: 10,
      volatility: 20,
    })
      .stroke({ width: i * 0.5, color: strokeGradient })
      .fill(gradient)
      .dy(i * -7 - 10)
      .addTo(root)
      .filterWith(blur(i * 0.09));

    if (randomBool(80)) treeOnPath(root, glade);
  }

  root.rect(100, 11).dy(80).opacity(0.75).fill(gladeColors[1]).hide();

  const trainCompositon = root.group();
  const train = new Train(root)
    .addTo(trainCompositon)
    .dx(randomInt(25, 35) * randomSide());

  train.dy(horizon - train.height()).filterWith(blur(random(0.3, 1), 0));

  new Bridge(root).addTo(trainCompositon).dy(horizon);

  trainCompositon.scale(random(0.55, 0.7));

  root.rect(100, 100).y(95).fill(gladeColors[0]).opacity(0.7);

  for (let y = 95.5; y < 101; y++) {
    root.line(0, y, 100, y).stroke({
      width: 0.4,
      color: "white",
      opacity: 0.2,
      dasharray: [random(1, 4), random(1, 4), random(1, 4)],
    });
  }

  if (randomBool())
    new Boat()
      .addTo(root)
      .mirror()
      .move(random(10, 90), random(85, 87))
      .scale(0.5)
      .fill(gladeColors[4])
      .filterWith(blur(0.2));

  const { complementary } = root.scheme.palette;
  const compColors = hueShift(complementary[1]);

  const gradient = generateGradient("linear", [
    [gladeColors[4], 0, 0],
    [gladeColors[8], 1],
  ])
    .from(0, 0)
    .to(0, 1)
    .addTo(root);

  root.rect(100, 30).dy(70).fill(gradient).opacity(0.8);
}

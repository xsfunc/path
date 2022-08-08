import { Container, extend } from "@svgdotjs/svg.js";
import { Forest } from "./components/Forest";
import { ForestTree } from "./components/ForestTree";
import { leavesComposition } from "./leavesComposition";
import { generateGradient } from "../../utils";
import { randomBool } from "../../utils/random";

export function forestComposition(draw) {
  extend(Container, {
    forest: function (args) {
      this.put(new Forest(this, args));
      return this;
    },
    forestTree: function (args) {
      return this.put(new ForestTree(this, args));
    },
  });

  draw.forest();

  leavesComposition(draw);
  fogLayer(draw);
}

function fogLayer(root) {
  if (randomBool(30)) return;

  const { colors } = root.scheme.forestTree;
  const fogColor = generateGradient("linear", [
    [colors[0], 0, 0],
    [colors[8], 1, 0.5],
  ])
    .from(0, 0)
    .to(0, 1)
    .addTo(root);

  root.rect(120, 50).move(-10, 60).fill(fogColor);
}

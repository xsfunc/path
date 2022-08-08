import { Container, extend } from "@svgdotjs/svg.js";
import { Dune } from "./components/Dune";
import { random, randomBool, randomInt } from "../../utils/random";
import { blur } from "../base/filters";

export function duneComposition(draw) {
  extend(Container, {
    dune: function (args) {
      return this.put(new Dune(this, args));
    },
  });

  if (randomBool(30)) {
    const { colors } = draw.scheme.dune;
    draw.rect(120, 30).dmove(-10, 75).fill(colors[6]).filterWith(blur(0.4));
    draw.dune().scale(1.2, 50, 100).dmove(30, -20).filterWith(blur(0.4));
    draw.dune().scale(1.3, 50, 100).dmove(10, -15).filterWith(blur(0.4));
    draw.dune().scale(1.3, 50, 100).dmove(-10, -15).filterWith(blur(0.25));
    draw.dune().scale(1.4, 50, 100).dmove(-20, -5).filterWith(blur(0.1));
    draw.dune().dmove(20, -1).scale(1.6, 50, 100).filterWith(blur(0.2));
    draw.dune().scale(1.5, 50, 100);
  } else {
    const duneCount = randomInt(1, 4);
    let scale = 1.7;
    let deviation = duneCount / 10;
    for (let i = 0; i < duneCount; i++) {
      draw
        .dune()
        .scale(scale, 50, 100)
        .dx(random(-10, 10))
        .filterWith(blur(deviation));
      deviation -= duneCount / 10 / (duneCount - 1);
      scale -= random(0.3, 0.4);
    }
  }
}

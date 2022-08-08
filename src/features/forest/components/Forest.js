import { random, randomInt } from "../../../utils/random";
import { generateGradient } from "../../../utils";
import { Glade } from "../../base/components/Glade";
import { G } from "@svgdotjs/svg.js";
import { blur } from "../../base/filters";

export class Forest extends G {
  constructor(root) {
    super();

    const { colors } = root.scheme.hills;
    const gladeGradient = generateGradient("linear", [
      [colors[4], 0],
      [colors[3], 1],
    ])
      .from(0, 0)
      .to(0, 1)
      .addTo(this);

    const gladeRimGradient = generateGradient("linear", [
      ["white", 0],
      ["white", 0.3, 0],
    ])
      .from(0, 0)
      .to(0, 1)
      .addTo(this);

    const otherGlade = new Glade({
      hillCountMin: 5,
      hillCountMax: 7,
      volatility: 20,
      height: 20,
    })
      .addTo(root)
      .fill(gladeGradient);

    otherGlade
      .stroke({ width: 1, color: gladeRimGradient })
      .filterWith(blur(0.2));

    const backGlade = new Glade({
      hillCountMin: 5,
      hillCountMax: 7,
      volatility: 10,
      height: 15,
    })
      .addTo(root)
      .fill(gladeGradient)
      .stroke({ width: 0.5, color: gladeRimGradient })
      .filterWith(blur(0.2));

    const middleGlade = new Glade({
      hillCountMin: 3,
      hillCountMax: 5,
      volatility: 4,
      height: 10,
    })
      .addTo(root)
      .fill(colors[5])
      .stroke({ width: 0.1, color: gladeRimGradient })
      .filterWith(blur(0.2));

    const frontGlade = new Glade({
      hillCountMin: 2,
      hillCountMax: 4,
      volatility: 2,
      height: 5,
    })
      .addTo(root)
      .fill(colors[6])
      .stroke({ width: 0.1, color: gladeRimGradient })
      .filterWith(blur(0.2));

    const pathStart = random(0, 70);
    const pathWidth = random(20, 25);
    const pathEnd = pathStart + pathWidth;

    const mask = root.mask();
    frontGlade.gladePath.clone().fill("white").addTo(mask);

    const path1 = root
      .polygon()
      .plot([
        [pathStart, 105],
        [pathEnd + 3, 105],
        [pathEnd - 5, 80],
      ])
      .fill(colors[1])
      .opacity(0.2)
      .maskWith(mask);
    path1.filterWith((add) => {
      const map = add.turbulence("0.001 .3", 1, 100, "stitch", "turbulence");

      add
        .displacementMap(add.$source, map, 8, "R", "G")
        .width("130%")
        .dx("-15%")
        .gaussianBlur(0.2)
        .css("color-interpolation-filters", "sRGB");
    });

    const mask2 = root.mask();
    middleGlade.gladePath.clone().fill("white").addTo(mask2);
    frontGlade.gladePath.clone().addTo(mask2);

    const path2 = root
      .polygon()
      .plot([
        [pathStart + 3, 105],
        [pathEnd - 7, 105],
        [pathEnd, 80],
      ])
      .fill(colors[1])
      .opacity(0.3)
      .maskWith(mask2)
      .filterWith((add) => {
        const map = add.turbulence(".001 .3", 10, 1, "stitch", "turbulence");

        add
          .displacementMap(add.$source, map, 8, "R", "G")
          .width("130%")
          .dx("-15%")
          .gaussianBlur(0.2)
          .css("color-interpolation-filters", "sRGB");
      });

    let x = 0;
    while (x < 100) {
      if (x > pathStart && x < pathEnd) {
        x = pathEnd;
        continue;
      }

      const blur = random(0.1, 0.8);
      const { colors } = root.scheme.forestTree;
      const treeColor = generateGradient("linear", [
        [colors[randomInt(0, 4)], 0],
        [colors[randomInt(0, 4)], 1],
      ])
        .from(0, 1)
        .to(0, 0)
        .addTo(this);

      const treeRimColor = generateGradient("linear", [
        [colors[0], 0],
        ["white", 0.3, 0],
      ])
        .from(0, 1)
        .to(1, 0)
        .addTo(this);

      const tree = root
        .forestTree()
        .x(x)
        .stroke({ width: 0.5, color: treeRimColor })
        .filterWith((add) => {
          const map = add.turbulence("0.01 .1", 10, 1, "stitch", "turbulence");

          add
            .width("300%")
            .dx("-100%")
            .displacementMap(add.$source, map, 0.5, "R", "G")
            .gaussianBlur(blur)
            .css("color-interpolation-filters", "sRGB");
        });

      tree.fill(treeColor).rotate(random(-2, 2), x + tree.width / 2, 100);

      if (blur <= 0.15) {
        tree.fill(colors[3]).insertAfter(frontGlade);
        path1.insertBefore(tree);
      } else if (blur <= 0.3) {
        tree.fill(colors[4]).insertAfter(middleGlade);
        path2.insertBefore(tree);
      } else tree.fill(colors[randomInt(5, 8)]).insertAfter(backGlade);

      x += random(2, 4);
    }
  }

  addHills() {}
}

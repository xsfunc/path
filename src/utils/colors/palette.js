import { allPalettes, hueShift } from ".";
import { randomInt } from "../../utils/random";

const printColor = (color) =>
  console.log(`%c ${color}           `, `background-color: ${color}`);

export function printPalette() {
  const baseColor = {
    l: randomInt(40, 60),
    c: 80,
    h: randomInt(0, 300),
    mode: "lch",
  };

  const palettes = allPalettes(baseColor);

  console.log(Object.values(baseColor).slice(0, 3));

  for (const [name, colors] of palettes) {
    console.groupCollapsed(name);
    for (const color of colors) {
      const shiftedColors = hueShift(color);
      for (const color of shiftedColors) {
        printColor(color);
      }
      console.log("");
    }

    console.groupEnd();
  }
}

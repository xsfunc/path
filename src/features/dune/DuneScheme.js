import { hueShift } from "../../utils/colors";
import { createScientificPalettes } from "../../utils/colors/scientificPalettes";
import { random, randomSample } from "../../utils/random";
import { Scheme } from "../base/Scheme";
import { Sun } from "../weather/components/Sun";
import { SunLayer } from "../weather/components/SunLayer";

export class DuneScheme extends Scheme {
  constructor() {
    super({
      c: 8,
      h: randomSample([35, 60, 135, 145, 165, 180, 200, 210, 220]),
    });

    this.isRaining = false;
    if (this.isDay()) {
      this.baseColor = {
        h: random(220, 250),
        c: random(20, 25),
      };

      const palette = createScientificPalettes(this.baseColor);
      const [_, second] = palette.complementary;
      const secondColors = hueShift(second);
      const sunColor = {
        ...this.baseColor,
        c: this.baseColor.c + 15,
        h: random(20, 30),
      };

      const sunColors = hueShift(sunColor);
      this.sun = {
        enabled: this.isDay(),
        factory: randomSample([Sun, SunLayer]),
        colors: sunColors,
      };

      const skyColors = hueShift(this.baseColor);
      this.sky = {
        gradientType: "linear",
        stops: [
          [skyColors[0], 0],
          [skyColors[2], 0.5],
          [skyColors[4], 1],
        ],
      };

      this.dune = {
        colors: secondColors,
      };
    } else {
      const [_, second] = this.palette.complementary;
      const duneColors = hueShift(second);

      this.dune = {
        colors: duneColors,
      };
    }

    this.rainbow = {
      enabled: false,
    };
  }
}

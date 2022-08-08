import { DAY_TIME, NIGTH_TIME } from "../../constants";
import { hueShift } from "../../utils/colors";
import { createScientificPalettes } from "../../utils/colors/scientificPalettes";
import {
  random,
  randomBool,
  randomInt,
  randomSample,
  randomSide,
} from "../../utils/random";
import { EclipseMoon } from "../weather/components/EclipseMoon";
import { Moon } from "../weather/components/Moon";
import { MoonBig } from "../weather/components/MoonBig";
import { SunBig } from "../weather/components/SunBig";

export class Scheme {
  constructor(options) {
    this.time = randomSample([NIGTH_TIME, DAY_TIME]);
    this.phenomenon = randomBool(10);
    this.isRaining = randomBool(30);
    this.hasBirds = randomBool(70);
    this.hasClouds = this.isRaining || randomBool(90);
    this.baseColor = {
      l: random(0, 15),
      c: random(5, 25),
      h: random(0, 360),
      mode: "lch",
      ...options,
    };

    const isEclipse = this.time === NIGTH_TIME && this.phenomenon;
    if (isEclipse) {
      this.baseColor = {
        l: 0,
        c: 1,
        h: random(140, 360),
        mode: "lch",
      };
    }

    if (this.time === DAY_TIME) {
      this.baseColor.l = random(40, 55);
      this.baseColor.c = random(10, 25);
    }

    this.palette = createScientificPalettes(this.baseColor);
    const [firstColor] = this.palette.analogous;
    const first = hueShift(firstColor);

    this.sky = {
      gradientType: "linear",
      stops: isEclipse
        ? [
            [first[4], 0],
            [first[3], 0.3],
            [first[3], 1],
          ]
        : [
            [first[0], 0],
            [first[2], 0.5],
            [first[4], 1],
          ],
    };

    this.clouds = {
      enabled: this.hasClouds,
      count: 6,
    };

    this.birds = {
      enabled: this.hasBirds,
      count: randomInt(3, 7),
    };

    const sunColor = { ...this.baseColor, h: random(20, 40) };
    const sunColors = hueShift(sunColor);
    this.sun = {
      enabled: this.time === DAY_TIME ? randomBool(70) : false,
      factory: randomSample([SunBig]),
      colors: sunColors,
    };

    this.moon = {
      enabled: !isEclipse && this.time === NIGTH_TIME ? randomBool(80) : false,
      factory: randomSample([Moon, MoonBig]),
    };

    this.eclipse = {
      enabled: isEclipse,
      factory: EclipseMoon,
    };

    this.rainbow = {
      enabled: this.time === DAY_TIME && this.phenomenon,
      width: 0.02,
      blurDeviation: random(0.5, 1),
      size: random(200, 300),
      center: [random(150, 180), 100],
      colors: ["red", "orange", "yellow", "green", "cyan", "blue", "purple"],
    };

    this.rain = {
      angle: random(-10, 10),
    };

    this.stars = {
      enabled: this.time === NIGTH_TIME,
    };

    this.windDirection = randomSide();
  }

  get baseColor() {
    return this._baseColor;
  }

  set baseColor(config) {
    this._baseColor = {
      ...this._baseColor,
      ...config,
    };
  }

  get time() {
    return this._time;
  }

  set time(newTime) {
    this._time = newTime;
  }

  set sun(config) {
    this._sun = {
      ...this._sun,
      ...config,
    };
  }

  get sun() {
    return this._sun;
  }

  get moon() {
    return this._moon;
  }

  set moon(config) {
    this._moon = {
      ...this._moon,
      ...config,
    };
  }

  set stars(config) {
    this._stars = {
      ...this._stars,
      ...config,
    };
  }

  get stars() {
    return this._stars;
  }

  set rainbow(config) {
    this._rainbow = {
      ...this._rainbow,
      ...config,
    };
  }

  get rainbow() {
    return this._rainbow;
  }

  set rain(config) {
    this._rain = {
      ...this._rain,
      ...config,
    };
  }

  get rain() {
    return this._rain;
  }

  set sky(config) {
    this._sky = {
      ...this._sky,
      ...config,
    };
  }

  get sky() {
    return this._sky;
  }

  isDay() {
    return this.time === DAY_TIME;
  }
}

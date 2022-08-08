import { hueShift } from "../../utils/colors";
import { randomInt, randomSample } from "../../utils/random";
import { Scheme } from "../base/Scheme";
import { SunBig } from "../weather/components/SunBig";
import { SunLayer } from "../weather/components/SunLayer";

export class TrainScheme extends Scheme {
  constructor() {
    super();

    const [firstColor, secondColor] = this.palette.analogous;
    const firstShifted = hueShift(firstColor);
    const secondShifted = hueShift(secondColor);

    this.horizon = randomInt(40, 45);

    this.train = {
      lightWindowColor: firstShifted[0],
      darkWindowColor: firstShifted[3],
      carriageColor: firstShifted[4],
    };

    this.bridge = {
      mainColors: [secondShifted[2], secondShifted[5]],
      shadowColors: [secondShifted[7], secondShifted[8]],
      fenceColor: secondShifted[8],
    };

    this.hills = {
      colors: secondShifted,
    };

    this.sun = {
      factory: randomSample([SunBig, SunLayer]),
    };
  }
}

import { hueShift } from "../../utils/colors";
import { Scheme } from "../base/Scheme";
import { MoonBig } from "../weather/components/MoonBig";

export class ForestScheme extends Scheme {
  constructor() {
    super();

    const [_, secondColor] = this.palette.analogous;
    const second = hueShift(secondColor);

    this.leaves = {
      colors: second,
    };

    this.forestTree = {
      colors: second,
    };

    this.hills = {
      colors: second,
    };

    this.moon = {
      factory: MoonBig,
    };
  }
}

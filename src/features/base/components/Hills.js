import { randomBool } from "../../../utils/random";

export class Hills {
  constructor(draw) {
    new HillLine(draw, -10);
    const hill = new HillLine(draw);

    let prev = 0;
    for (let i = 0; i < 80; i = i + 4) {
      const result = randomBool();
      if (result) {
        hill.addTree(prev, i);
        prev = i;
      }
    }

    new HillLine(draw, 20);
  }
}

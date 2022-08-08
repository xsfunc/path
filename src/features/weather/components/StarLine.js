import { random } from "../../../utils/random";

export class StarLine {
  constructor(root, side = 1) {
    this.length = random(0, 10) + 5;
    this.x = random(0, 60) + 10;
    this.y = random(0, 30) + 5;
    this.dx = this.x + this.length * side;
    this.dy = this.y + this.length;

    const gradient = root.gradient("linear").from(0, 1).to(0, 0);
    gradient.stop(0, "white");
    gradient.stop(1, "white", 0);

    root
      .line(this.x, this.y, this.dx, this.dy)
      .stroke({ width: 0.2, color: gradient, linecap: "round" })
      .opacity(0.5);
  }
}

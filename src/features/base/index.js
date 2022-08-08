import { randomBool } from "../../utils/random";
import { SimpleTree } from "./components/SimpleTree";
import { blur } from "./filters";

export function treeOnPath(root, glade) {
  for (let i = 0; i < 100; i = i + 2) {
    if (randomBool(50)) {
      const pathLength = glade.treePath.length();
      const point = glade.treePath.pointAt((pathLength / 100) * i);
      const [x, y] = point.toArray();

      const tree = new SimpleTree()
        .addTo(root)
        .fill(glade.fill())
        .insertBefore(glade)
        .filterWith(blur(0.2));

      tree.center(x, y - tree.heights / 3);
    }
  }
}

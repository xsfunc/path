import { Gradient } from "@svgdotjs/svg.js";

export function generateGradient(type, stops) {
  const gradient = new Gradient(type);

  stops.forEach(([color, offset, opacity = 1], index) => {
    gradient.stop({
      offset,
      color,
      opacity,
    });
  });

  return gradient;
}

const isObject = (item) => {
  return item && typeof item === "object" && !Array.isArray(item);
};

export const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key])
          Object.assign(target, {
            [key]: {},
          });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key],
        });
      }
    }
  }

  return mergeDeep(target, ...sources);
};

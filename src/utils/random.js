export const random = (min = 0, max = 1) => fxrand() * (max - min) + min;

export const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min + 1)) + min;
};

export const randomSample = (array) =>
  array[Math.floor(fxrand() * array.length)];

export const randomSide = () => randomSample([-1, 1]);

export function randomInsideCircle(radius, cx = 0, cy = 0) {
  const r = radius * Math.sqrt(fxrand());
  const theta = fxrand() * 2 * Math.PI;
  const x = cx + r * Math.cos(theta);
  const y = cy + r * Math.sin(theta);
  return { x, y };
}

export function randomBool(truePercent = 50) {
  const falsePercent = 100 - truePercent;
  const items = [
    {
      weight: truePercent,
      value: true,
    },
    {
      weight: falsePercent,
      value: false,
    },
  ];
  const randFunc = createWeightedSelector(items);
  return randFunc();
}

export function createWeightedSelector(items) {
  const weightedArray = [];
  for (let item of items)
    for (let i = 0; i < item.weight; i++) weightedArray.push(item.value);
  return () => randomSample(weightedArray);
}

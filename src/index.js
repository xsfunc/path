import { SVG, extend, Container } from "@svgdotjs/svg.js";
import { grainLayer } from "./features/grain";
import { randomSample } from "./utils/random";
import { ECLIPSE, RAINBOW } from "./constants";
import {
  birdsComposition,
  rainComposition,
  skyComposition,
} from "./features/weather";
import { ForestScheme } from "./features/forest/ForestScheme";
import { forestComposition } from "./features/forest/forestComposition";
import { DuneScheme } from "./features/dune/DuneScheme";
import { duneComposition } from "./features/dune/duneComposition";
import { TrainScheme } from "./features/train/TrainScheme";
import { trainCompositon } from "./features/train";
import "@svgdotjs/svg.filter.js";

const features = [
  {
    name: "Forest",
    scheme: ForestScheme,
    composition: forestComposition,
  },
  {
    name: "Desert",
    scheme: DuneScheme,
    composition: duneComposition,
  },
  {
    name: "Train",
    scheme: TrainScheme,
    composition: trainCompositon,
  },
];

const { scheme, composition, name } = randomSample(features);
extend(Container, {
  scheme: new scheme(),
});

const root = SVG("#canvas").root();
skyComposition(root);
composition(root);
birdsComposition(root);
rainComposition(root);
grainLayer(root);

const { time, isRaining, hasBirds, hasClouds, rainbow, eclipse } = root.scheme;
const phenomenon = rainbow.enabled
  ? RAINBOW
  : eclipse.enabled
  ? ECLIPSE
  : false;

// @ts-ignore
window.$fxhashFeatures = {
  Composition: name,
  Phenomenon: phenomenon,
  Time: time,
  Rain: isRaining,
  Birds: hasBirds,
  Clouds: hasClouds,
};

try {
  fxpreview();
} catch (e) {
  console.warn(e.message);
}

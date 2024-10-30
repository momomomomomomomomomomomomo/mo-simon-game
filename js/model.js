import { blue, red, green, yellow, wrong } from '../sounds/sounds';
export const state = {
  colours: ['blue', 'red', 'green', 'yellow'],
  //the right pattern to follow
  pattern: [],
  currentIndex: 0,
  heigstScore: 0,
  level: 0,
  coloursSound: {
    blue,
    red,
    green,
    yellow,
    wrong,
  },
};

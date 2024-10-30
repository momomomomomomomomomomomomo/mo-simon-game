import { blue, red, green, yellow, wrong } from '../sounds/sounds';
export const state = {
  colours: ['blue', 'red', 'green', 'yellow'],
  //the right pattern to follow
  pattern: [],
  currentIndex: 0,
  heighstScore: 0,
  level: 0,
  coloursSound: {
    blue,
    red,
    green,
    yellow,
    wrong,
  },
};
export const addHeighstScore = function (score) {
  localStorage.setItem('heighstScore', JSON.stringify(state.heighstScore));
};
const initScore = function () {
  const storage = localStorage.getItem('heighstScore');
  if (storage) state.heighstScore = JSON.parse(storage);
};
initScore();

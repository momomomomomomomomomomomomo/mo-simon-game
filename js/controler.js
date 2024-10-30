import { INIT_PATTERN, PRESS_SEC } from './config.js';
import { state } from './model.js';
import view from './view.js';

const chooseRandomColour = () => state.colours[Math.floor(Math.random() * 4)];
const gameOver = function () {
  let audio = new Audio(state.coloursSound.wrong);

  audio.play();
  view.renderGameOver();
  state.currentIndex = 0;
  state.level = 0;
  if (state.heigstScore < state.level) {
    state.heigstScore = state.level;
  }
  state.pattern = [chooseRandomColour()];
  view.rendderTitle('Game Over, Press Any Key to Restart');
};
const press = function () {
  return new Promise(resolve => setTimeout(resolve, 10000 * PRESS_SEC));
};

const controlPress = function (colour) {
  //check the user press vs pattern
  //reset game
  if (colour !== state.pattern[state.currentIndex]) return gameOver();
  ++state.currentIndex;
  let audio = new Audio(state.coloursSound[colour]);

  audio.play();
  view.renderPress(colour);
};
const controlAddPattern = async function () {
  try {
    //checking reach the end of the pattern
    if (state.currentIndex < state.pattern.length) return;
    //reset index
    state.currentIndex = 0;
    //push random colour
    state.pattern.push(chooseRandomColour());
    ++state.level;
    view.rendderTitle(`Level ${state.level}`);
    console.log(state.pattern);
    view.controlButtons();
    for (let i = 0; i < state.pattern.length; ++i) {
      await press();
      let audio = new Audio(state.coloursSound[state.pattern[i]]);

      audio.play();

      view.renderPress(state.pattern[i]);
    }
    view.controlButtons();
  } catch (err) {
    console.error(err);
  }
};
const controlStart = function () {
  if (state.level !== 0) return;
  ++state.level;
  let audio = new Audio(state.coloursSound[state.pattern[INIT_PATTERN]]);
  view.renderPress(state.pattern[INIT_PATTERN]);
  view.rendderTitle(`Level ${state.level}`);

  audio.play();
};
// const controlPattern = function () {
//   state.pattern.push(chooseRandomColour());
// };
const init = function () {
  state.pattern = [chooseRandomColour()];
  view.addHandlerClick(controlPress, controlAddPattern);
  view.addHandlerStartBtn(controlStart);
};

init();

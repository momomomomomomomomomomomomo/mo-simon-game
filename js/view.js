import { GAME_OVER_SEC, PRESS_SEC } from './config.js';

class View {
  _startButton = document.getElementById('start-button');
  _coloursContainer = document.querySelector('.container');
  _title = document.getElementById('level-title');
  _body = document.querySelector('body');
  _score = document.getElementById('score');
  _colourClick(pressHandler, addPatternHandler, e) {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    pressHandler(btn.id);
    addPatternHandler();
  }
  renderPress(colour) {
    const el = document.getElementById(`${colour}`);
    el.classList.toggle('pressed');
    setTimeout(() => {
      el.classList.toggle('pressed');
    }, 1000 * PRESS_SEC);
  }
  renderGameOver() {
    this._body.classList.toggle('game-over');
    setTimeout(() => {
      this._body.classList.toggle('game-over');
    }, 1000 * GAME_OVER_SEC);
    this._startButton.classList.remove('hide');
    this._startButton.textContent = 'Play Again';
    this._coloursContainer.classList.add('inactive');
  }
  addHandlerClick(pressHandler, addPatternHandler) {
    this._coloursContainer.addEventListener(
      'click',
      this._colourClick.bind(this, pressHandler, addPatternHandler)
    );
  }
  startingGameButton(handler) {
    this._startButton.classList.add('hide');
    this._coloursContainer.scrollIntoView({
      behavior: 'smooth',
    });
    this._coloursContainer.classList.remove('inactive');
    handler();
  }
  startingGameKeyboard(handler) {
    handler();
    this._startButton.classList.add('hide');
    this._coloursContainer.classList.remove('inactive');
  }
  addHandlerStartBtn(handler) {
    this._startButton.addEventListener(
      'click',
      this.startingGameButton.bind(this, handler)
    );
    window.addEventListener(
      'keydown',
      this.startingGameKeyboard.bind(this, handler)
    );
  }
  rendderTitle(title) {
    this._title.textContent = title;
  }
  controlButtons() {
    this._coloursContainer.classList.toggle('inactive');
  }
  renderScore(score) {
    this._score.textContent = `Heighst Score: ${score}`;
  }
}
export default new View();

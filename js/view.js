import { GAME_OVER_SEC, PRESS_SEC } from './config.js';

class View {
  _startButton = document.getElementById('start-button');
  _coloursContainer = document.querySelector('.container');
  _title = document.getElementById('level-title');
  _body = document.querySelector('body');
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
  }
  addHandlerClick(pressHandler, addPatternHandler) {
    this._coloursContainer.addEventListener(
      'click',
      this._colourClick.bind(this, pressHandler, addPatternHandler)
    );
  }
  startingGameButton(handler, e) {
    const btn = e.target;
    btn.classList.add('hide');
    this._coloursContainer.scrollIntoView({
      behavior: 'smooth',
    });
    handler();
  }
  addHandlerStartBtn(handler) {
    this._startButton.addEventListener(
      'click',
      this.startingGameButton.bind(this, handler)
    );
    window.addEventListener('keydown', handler);
  }
  rendderTitle(title) {
    this._title.textContent = title;
  }
  controlButtons() {
    this._coloursContainer.classList.toggle('inactive');
  }
}
export default new View();

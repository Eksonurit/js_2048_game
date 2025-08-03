'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

function render() {
  const state = game.getState();
  const cells = document.querySelectorAll('.field-cell');
  const scoreElement = document.querySelector('.game-score');
  const messageWin = document.querySelector('.message-win');
  const messageLose = document.querySelector('.message-lose');

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const cell = cells[i * 4 + j];
      const value = state[i][j];

      cell.textContent = '';
      cell.className = 'field-cell';

      if (value !== 0) {
        cell.textContent = value;
        cell.classList.add(`field-cell--${value}`);
      }
    }
  }

  scoreElement.textContent = game.getScore();

  // eslint-disable-next-line no-shadow
  const status = game.getStatus();

  if (status === 'win') {
    messageWin.classList.remove('hidden');
  } else {
    messageWin.classList.add('hidden');
  }

  if (status === 'lose') {
    messageLose.classList.remove('hidden');
  } else {
    messageLose.classList.add('hidden');
  }
}
// eslint-disable-next-line no-undef

document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
  }
  render();
});

const startBtn = document.querySelector('.start');
const messageStart = document.querySelector('.message-start');

startBtn.addEventListener('click', () => {
  game.restart();
  render();
  messageStart.classList.add('hidden');
  startBtn.textContent = 'Restart';
});

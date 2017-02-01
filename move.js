var map = require('./map');
var newState = require('./getNewState');

function move(currentState, operation, max_x, max_y) {

  var current_x = currentState.current_x;
  var current_y = currentState.current_y;

  if (operation === 'addx') {

    if ((currentState.current_x + 1) < max_x) {
      return new newState(current_x + 1, current_y, currentState.current_direction, true);
    }
  }

  if (operation === 'addy') {
    if ((currentState.current_y + 1) < max_y) {
      return new newState(current_x, current_y + 1, currentState.current_direction, true);
    }
  }

  if (operation === 'subx') {
    if ((currentState.current_x - 1) >= 0) {
      return new newState(current_x - 1, current_y, currentState.current_direction, true);
    }
  }

  if (operation === 'suby') {
    if ((currentState.current_y - 1) >= 0) {
      return new newState(current_x, current_y - 1, currentState.current_direction, true);
    }
  }
  return currentState;
}
module.exports = move;

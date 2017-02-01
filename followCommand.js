var map = require('./map');
var newState = require('./getNewState');
var move = require('./move');

function followCommand(currentState, command, max_x, max_y) {
  var current_x = currentState.current_x;
  var current_y = currentState.current_y;
  var current_direction = currentState.current_direction;

  if (command === 'l' || command === 'r') {
    var newDirection = map[current_direction][command];
    return new newState(current_x, current_y, newDirection, true);
  }
  if (command === 'm') {
    var operation = map[current_direction][command];
    return move(currentState, operation, max_x, max_y);
  }
}
module.exports = followCommand;
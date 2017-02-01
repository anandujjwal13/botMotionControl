var map = require('./map');
function newState(xCord, yCord, direction, isValid) {
  this.current_x = xCord;
  this.current_y = yCord;
  this.current_direction = direction;
  this.isValid = isValid;
}
module.exports = newState;
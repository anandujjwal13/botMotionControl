var followCommand = require('./followCommand');
var state = {
  current_x: 0,
  current_y: 0,
  current_direction: 'e',
  isValid: true
}
var result = state;
var ins = 'mmrmmrmmlmmrmmlllmmm';
for (var insIndex = 0; insIndex < ins.length; insIndex++) {
  result = followCommand(result, ins[insIndex], 20, 20);
}
console.log(result);


var prompt = require('prompt');
var followCommand = require('./followCommand');
var fs = require('fs');
var os = require('os');
var path = require('path');
var newState = require('./getNewState');
var proceedFurther = true;
prompt.start();
prompt.get(['File'], function (err, result) {
  if (err) {
    console.log(err);
    return;
  }
  var inputFile = result.File;
  if (inputFile === undefined) {
    console.log('Error : No file given as input');
    return;
  }
  inputFile = inputFile.toString();
  var stats = fs.statSync(inputFile);
  var fileSizeInBytes = stats["size"];
  var fileSizeInMegabytes = fileSizeInBytes / 1000000.0;

  fs.exists(inputFile, (exists) => {
    if (!exists) {
      console.log(inputFile + ' does not exists ');
      proceedFurther = false;
    }
  });

  if (!proceedFurther) {
    return;
  }


  if (path.extname(inputFile) != `.txt`) {
    console.log(inputFile + ' not of .txt format');
    return;
  }
  if (fileSizeInMegabytes > 1024) {
    console.log('exceeding the maximum file size limit ');
    return;
  }

  fs.readFile(inputFile, (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      data = data.toString().toLowerCase();
      var lines = data.toString().split(os.EOL, 3);
      if (lines.length < 3) {
        console.log('Input file has less than 3 lines of instructions');
        return;
      }
      var line1 = lines[0].split(" ", 2);
      if (line1.length < 2) {
        console.log('Max grid size is not specified at line 1');
        return;
      }
    
      if (isNaN(parseInt(line1[0], 10))) {
        console.log('Max grid size at line no 1 is not a number');
        return;
      }
      if (isNaN(parseInt(line1[1], 10))) {
        console.log('Max grid size at line no 1 is not a number');
        return;
      }

      var line2 = lines[1].split(" ", 3);
      if (line2.length < 3) {
        console.log('Invalid instructions  at line 2');
        return;
      }
      if (isNaN(parseInt(line2[0], 10))) {
        console.log(' current x position at line no 2 is not a number');
        return;
      }
      if (isNaN(parseInt(line2[1], 10))) {
        console.log(' current y position at line no 2 is not a number');
        return;
      }

      if (!((line2[2] === 'w') || (line2[2] === 'e') || (line2[2] === 'n') || (line2[2] === 's'))) {
        console.log('Invalid direction at line 2 ');
        return;
      }


      var commands = lines[2];
      for (var insIndex = 0; insIndex < commands.length; insIndex++) {
        if (!((commands[insIndex] === 'l')||(commands[insIndex] === 'r')||(commands[insIndex] === 'm'))) {
          console.log('Invalid movement commands found ');
          return;
        }
      }

      var current_x = parseInt(line2[0], 10);
      var current_y = parseInt(line2[1], 10);
      var current_direction = line2[2];
      var isValid = true;
      var max_x = parseInt(line1[0], 10);
      var max_y = parseInt(line1[1], 10);
      var state = new newState(current_x, current_y, current_direction, isValid);
      var result = state;
    
      for (var insIndex = 0; insIndex < commands.length; insIndex++) {
        result = followCommand(result, commands[insIndex], max_x, max_y);
      }
      console.log(result);
    
    }

  });
});











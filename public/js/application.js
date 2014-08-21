var Board = function() {
  this.locked = true;
  this.cells = $('table td');
};

var Game = function() {
  this.board = new Board;
  this.prompt = new Prompt;
  this.status = $('#status');
};

var Prompt = function() {
  this.playerButtons = $('.player-buttons');
  this.resetButton = $('#reset')
  this.status = $('#status');
}

Board.prototype.read = function() {
  var boardArray = [];
  this.cells.map(function() {
    boardArray.push($(this).html());    
  });

  return boardArray;
}

Board.prototype.lock = function() {
  this.locked = true;
}

Board.prototype.unlock = function() {
  this.locked = false;
}

Board.prototype.write = function(cell, mark) {
  cell.html(mark);
}

Board.prototype.getCellByMove = function(move) {
    var row = parseInt((move - 1) / 3) + 1;
    var column = ((move - 1) % 3) + 1;
    return $('table tr:nth-child(' + row + ') td:nth-child(' + column + ')')
}

Board.prototype.reset = function() {
  this.cells.html('');
}

Game.prototype.getComputerMove = function() {
  var url = '/computer_move';
  var data = { board: this.board.read() } ;

  return $.get(url, data, { dataType: "json" });  
}

Game.prototype.makeComputerMove = function(move) {
  var cell = this.board.getCellByMove(move);
  this.board.write(cell, 'O');
}

Game.prototype.makeHumanMove = function(move) {
  this.board.write(move, "X"); 
}

Game.prototype.interpretComputerMove = function(rating) {
  var text;

  switch (rating) {
    case 100:
      text = 'Ai wins';
      break;
    case 0:
    case -101:
      text = 'Draw';
      break;
    default:
      text = 'Go';
      this.board.unlock();
  }

  this.prompt.setStatusText(text);
}

Game.prototype.computerMove = function() {
  var self = this;
  self.prompt.loading();

  self.getComputerMove().done(function(response) {
    var move = JSON.parse(response);
    self.makeComputerMove(move.move);
    self.interpretComputerMove(move.rating);
  });
}

Game.prototype.start = function() {
  this.prompt.setStatusText('Who starts?');
  this.board.reset();
  this.prompt.setToPreGame();
}

Prompt.prototype.setToPreGame = function() {
  this.playerButtons.show();
  this.resetButton.hide(); 
};

Prompt.prototype.setToGameUnderway = function() {
  this.playerButtons.hide();
  this.resetButton.show();
};

Prompt.prototype.setStatusText = function(text) {
  this.status.html('<span>' + text + '</span>');
}

Prompt.prototype.loading = function() {
  this.status.html('<img src="img/ajax-loader.gif" alt="loader">')
}

$(document).ready(function() {
  game = new Game;
  prompt = new Prompt;
  game.start();

  $('#human').on('click', function() {
    prompt.setStatusText('Go');   
    game.board.unlock();
  });

  $('#ai').on('click', function() {
    game.computerMove();
  });

  $('.player-buttons').on('click', function() {
    prompt.setToGameUnderway();
  });

  $('table').on('click', 'td', function() {
    if($(this).html() === "" && game.board.locked === false) {
      game.board.lock();
      game.makeHumanMove($(this));
      game.computerMove();
    }
  })

  $('#reset').on('click', function() {
    game.start();
  })

})



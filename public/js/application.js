var Board = function() {
  this.locked = true;
  this.cells = $('table td');
};

var Game = function() {
  this.status = $('#status');
  this.board = new Board;
  this.loader = $('#loader');
};

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

  this.status.html('<span>' + text + '</span>');
}

Game.prototype.computerMove = function() {
  game.loading();
  var self = this;
  self.getComputerMove().done(function(response) {
    console.log(response)
    var move = JSON.parse(response);
    self.makeComputerMove(move.move);
    self.interpretComputerMove(move.rating);
  });
}

Game.prototype.loading = function() {
  this.status.html('<img src="img/ajax-loader.gif" alt="loader">')
}

Game.prototype.start = function() {
  this.status.html('<span>Who starts?</span>');
  this.board.reset();
}

$(document).ready(function() {
  game = new Game;

  game.start();

  $('#human').on('click', function() {
    game.board.unlock();
  });

  $('#ai').on('click', function() {
    game.computerMove();
    console.log('move made')
    game.board.unlock();

  });

  $('table').on('click', 'td', function() {
    if($(this).html() === "" && game.board.locked === false) {
      game.board.lock();
      game.makeHumanMove($(this));
      game.computerMove();
    }
  })

  $('#reset').on('click', function() {
    game.start(board);
  })

})



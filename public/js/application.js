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
    case 1:
     text = 'Draw';
     break;
    case -101:
      text = "Click 'Reset' to play again";
      break;
    default:
      text = 'Go';
  }

  this.status.html('<span>' + text + '</span>');
}

Game.prototype.loading = function() {
  this.status.html('<img src="img/ajax-loader.gif" alt="loader">')
}

Game.prototype.start = function() {
  this.status.html('<span>Start</span>');
  this.board.reset();
}

$(document).ready(function() {
  game = new Game;
  game.start();

  $('table').on('click', 'td', function() {
    if($(this).html() === "" && game.board.locked === false){
      game.board.lock();
      game.makeHumanMove($(this));
      game.loading();

      game.getComputerMove().done(function(response) {
        var move = JSON.parse(response);
        game.makeComputerMove(move.move)
        game.interpretComputerMove(move.rating);
        game.board.unlock();
      });
    }
  })

  $('#reset').on('click', function() {
    game.start(board);
  })

})



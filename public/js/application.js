var Board = function() {};
var Game = function() {
  this.status = $('#status')
  // this.board = new Board
};

Board.prototype.read = function() {
  var boardArray = [];
  $('#board td').map(function() {
    boardArray.push($(this).html());    
  });

  return boardArray;
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
  $('table td').html('');
}

Game.prototype.getComputerMove = function(board) {
  var url = '/computer_move';
  var data = { board: board } ;

  return $.get(url, data, { dataType: "json" });  
}

Game.prototype.makeComputerMove = function(move, board) {
  var cell = board.getCellByMove(move.move);
  board.write(cell, 'O');
  $('#loader').hide();
}

Game.prototype.makeHumanMove = function(move, board) {
  board.write(move, "X"); 
  $('#loader').show();
}

Game.prototype.interpretComputerMove = function(rating) {
  var text;

  if (rating === 100)
    text = 'Ai wins';
  else if (rating === 1)
   text = 'Draw';
  else
    text = '';

  this.status.html('<span>' + text + '</span>');
  $('#reset').show();
  // if (text) {
  //   $('#status span').text(text);
  //   $('#reset').show();
  // }
}

Game.prototype.loading = function() {
  this.status.html('<img src="img/ajax-loader.gif" alt="loader" id="loader">')
}

Game.prototype.start = function(board) {
  // $('#loader').hide();
  // $('#reset').hide();
  $('#status span').html('Start');
  board.reset();
}

$(document).ready(function() {
  board = new Board;
  game = new Game;
  game.start(board);

  $('table').on('click', 'td', function() {
    if($(this).html() === "") {
      game.makeHumanMove($(this), board);
      game.loading()
      game.getComputerMove(board.read()).done(function(response) {
        // $('#loader').hide();
        var move = JSON.parse(response);
        console.log(move); //DELETE
        game.makeComputerMove(move, board)
        game.interpretComputerMove(move.rating);
      });
    }
  })

  $('#reset').on('click', function() {
    // board.reset();
    // game.setInitialConditions();
  })

})



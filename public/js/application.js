var Board = function() {};
var Game = function() {};

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

Game.prototype.getComputerMove = function(board) {
  var url = '/computer_move';
  var data = { board: board } ;

  return $.get(url, data, { dataType: "json" });  
}

Game.prototype.makeComputerMove = function(move, board) {
  var cell = board.getCellByMove(move.move);
  board.write(cell, 'O');
}

Game.prototype.interpretComputerMove = function(rating) {
  var text

  if (rating === 100)
    return 'Ai wins';
  else if (rating === 1)
    return 'Draw';

  // $('#status span').text(text);
}

$(document).ready(function() {
  board = new Board;
  game = new Game;

  $('#loader').hide();
  $('#reset').hide();


  $('table').on('click', 'td', function() {
    if($(this).html() === "") {
      board.write($(this), "X"); 
      $('.loader').show();

      game.getComputerMove(board.read()).done(function(response) {
        $('.loader').hide();
        var move = JSON.parse(response);
        console.log(move);
        game.makeComputerMove(move, board)
        var outcome = game.interpretComputerMove(move.rating);

        if (outcome) {
          $('#status span').text(outcome);
        }

      });

    }
  })
})



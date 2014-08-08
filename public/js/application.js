var Board = function() {};

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

function getComputerMove(board) {
  var url = '/computer_move';
  var data = { board: board } ;

  return $.get(url, data, { dataType: "json" });  
}

$(document).ready(function() {
  board = new Board;
  $('.loader').hide();

  $('table').on('click', 'td', function() {
    console.log('click')
    if($(this).html() === "") {
      board.write($(this), "X"); 
      $('.loader').show();

      getComputerMove(board.read()).done(function(response) {
        $('.loader').hide();
        var move = JSON.parse(response);
        console.log(move);
        var cell = board.getCellByMove(move.move);
        board.write(cell, 'O');
      });

    }
  })
})



var Board = function() {

};


Board.prototype.read = function() {
  boardArray = [];
  $('#board td').map(function() {
    boardArray.push($(this).html());    
  });

  return boardArray;
}

function getComputerMove(board) {
  var url = '/computer_move';
  var data = {board: board } ;
  console.log(data);
  
  $.post(url, data, function() {
    console.log("in get");
  })
}

// Board.prototype.write(move, mark) = 

$(document).ready(function() {
  board = new Board;

  $('table').on('click', 'td', function() {
    console.log($(this).html());
    if($(this).html() == "") {
      $(this).html('X') 
      getComputerMove(board.read())
    }
  })
})



var Board = function() {

};


Board.prototype.read = function() {
  boardArray = [];
  $('#board td').map(function() {
    boardArray.push($(this).html());    
  });

  return boardArray;
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



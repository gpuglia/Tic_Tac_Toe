define(function() {
  var Board = function() {
    this.locked = true;
    this.cells = $('table td');
  };

  Board.prototype.read = function() {
    var boardArray = [];
    this.cells.map(function() {
      boardArray.push($(this).html());    
    });

    return boardArray;
  };

  Board.prototype.lock = function() {
    this.locked = true;
  };

  Board.prototype.unlock = function() {
    this.locked = false;
  };

  Board.prototype.write = function(cell, mark) {
    cell.html(mark);
  };

  Board.prototype.getCellByMove = function(move) {
      var row = parseInt((move - 1) / 3) + 1;
      var column = ((move - 1) % 3) + 1;
      return $('table tr:nth-child(' + row + ') td:nth-child(' + column + ')')
  };

  Board.prototype.reset = function() {
    this.cells.html('');
  };

  return Board
})

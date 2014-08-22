var Game = function() {
  this.board = new Board;
  this.prompt = new Prompt;
  this.status = $('#status');
};

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
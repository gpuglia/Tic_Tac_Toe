define(["board"], function(Board) {
  describe("Board", function() {
    var board;

    beforeEach(function() {
      loadFixtures('board.html'); 
      board = new Board; 
    });

    it("is locked by default", function() {
      expect(board.locked).toBe(true);
    });

    it("has cells", function() {
      expect(board.cells).toBe('table td');
    });

    describe("prototype.read", function() {
      it("returns an array of the board", function(){
        expect(board.read()).toEqual(['X', '', 'X', '', 'O', '', '', '', '']);
      });
    });

    describe("prototype.lock", function() {
      it("locks the board", function(){
        board.locked = false;
        board.lock();
        expect(board.locked).toBe(true);
      });
    });

    describe("prototype.unlock", function() {
      it("locks the board", function(){
        board.locked = true;
        board.unlock();
        expect(board.locked).toBe(false);
      });
    });

    describe("prototype.getCellByMove", function() {
      it("selects a cell according to a move", function() {
        var move = 4;
        expect(board.getCellByMove(move)).toBe('table tr:nth-child(2) td:nth-child(1)');
      });
    });

    describe("prototype.write", function() {
      it("writes a mark on a given cell", function() {
        var mark = 'O';
        var cell = board.getCellByMove(4);
        board.write(cell, mark);
        expect(cell).toHaveHtml(mark);
      });
    });

    describe("prototype.reset", function() {
      it("sets every cell on the board to an empty string", function() {
        board.reset();
        expect(board.cells).toHaveHtml('');
      });
    });
  }); 
});

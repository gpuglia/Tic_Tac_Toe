define(["public/js/board"], function(Board) {
  describe("Board", function() {
    it("is locked by default", function() {
      var board = new Board;
      expect(board.locked).toBe(true);
    });
  }); 
});

define(["game", "board", "prompt"], function(Game, Board, Prompt) {
  describe("Game", function() {
    var game; 

    beforeEach(function() {
      loadFixtures("board.html");
      game = new Game;
    }); 

    it("has a board", function() {
      expect(game.board instanceof Board).toBe(true);
    });

    it("has a prompt", function() {
      expect(game.prompt instanceof Prompt).toBe(true);
    });

    describe("prototype.getComputerMove", function() {
      beforeEach(function() {
        spyOn($, 'get');
      });

      it("sends a get request to obtain the computer move with the correct parameters", function() {
        var url = '/computer_move';
        var data = { board: game.board.read() } ;
        game.getComputerMove();
        expect($.get).toHaveBeenCalledWith(url, data);
      })
    });


    describe("prototype.makeComputerMove", function() {
      it("writes the computer piece in the given cell", function() {
        var move = 4;
        var cell = game.board.getCellByMove(move);
        game.makeComputerMove(move);
        expect(cell).toHaveHtml('O');
      });
    });

    describe("prototype.makeHumanMove", function() {
      it("writes the computer piece in the given cell", function() {
        var move = 4;
        var cell = game.board.getCellByMove(move);
        game.makeHumanMove(cell);
        expect(cell).toHaveHtml('X');
      });
    });

    describe("prototype.interpretComputerMove", function() {
      beforeEach(function() {
        spyOn(game.prompt, 'setStatusText');
      });

      it("sets the status to notify that the computer has won", function() {
        game.interpretComputerMove(100);
        expect(game.prompt.setStatusText).toHaveBeenCalledWith('Ai wins');
      });

      it("sets the status to notify that there's been a draw (1st possibility)", function() {
        game.interpretComputerMove(0);
        expect(game.prompt.setStatusText).toHaveBeenCalledWith('Draw');
      });

      it("sets the status to notify that there's been a draw (2nd possibility)", function() {
        game.interpretComputerMove(-101);
        expect(game.prompt.setStatusText).toHaveBeenCalledWith('Draw');
      });

      it("sets the status to prompt the human player to continue", function() {
        game.interpretComputerMove(1);
        expect(game.prompt.setStatusText).toHaveBeenCalledWith('Go');
      });
    });

    describe("prototype.computerMove", function() {
      var deferred = new $.Deferred();

      describe("before receiving the response", function() {
        beforeEach(function() {
          spyOn(game.prompt, 'loading');
          spyOn(game, 'getComputerMove').andReturn(deferred);
          game.computerMove();
        });

        it("sets the prompt to loading", function() {
          expect(game.prompt.loading).toHaveBeenCalled();
        });

        it("gets a move by calling getComputerMove()", function() {
          expect(game.getComputerMove).toHaveBeenCalled();
        });
      });

      describe("after receiving a response from the server", function() {
        var response

        beforeEach(function() {
          response = '{ "move": 4, "rating": -1 }';
          spyOn(game, 'getComputerMove').andReturn(deferred.resolve(response));
          spyOn(JSON, 'parse').andReturn({ move: 4, rating: -1 });
          spyOn(game, 'makeComputerMove');
          spyOn(game, 'interpretComputerMove');
          game.computerMove();
        });

        it("parses the response into a json object", function() {
          expect(JSON.parse).toHaveBeenCalledWith(response);
        });

        it("makes the computer move", function() {
          expect(game.makeComputerMove).toHaveBeenCalledWith(4);
        });

        it("call interpretComputerMove", function() {
          expect(game.interpretComputerMove).toHaveBeenCalledWith(-1);
        });
      });

      describe("prototype.start", function() {
        beforeEach(function() {
          spyOn(game.prompt, 'setStatusText');
          spyOn(game.board, 'reset');
          spyOn(game.prompt, 'setToPreGame');
          game.start(); 
        });

        it("asks the user to select who goes first", function() {
          expect(game.prompt.setStatusText).toHaveBeenCalledWith("Who starts?")
        });

        it("resets the board", function() {
          expect(game.board.reset).toHaveBeenCalled();
        });

        it("sets the prompt to its pre game conditions", function() {
          expect(game.prompt.setToPreGame).toHaveBeenCalled();
        })
      })
    });
  });
});
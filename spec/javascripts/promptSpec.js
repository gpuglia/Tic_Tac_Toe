define(["prompt"], function(Prompt) {
  describe("Prompt", function() {
    var prompt;

    beforeEach(function() {
      loadFixtures("board.html");
      prompt = new Prompt;
    });

    it("has player buttons", function() {
      expect(prompt.playerButtons).toBe('.player-buttons');
    });

    it("has a reset button", function() {
      expect(prompt.resetButton).toBe('#reset');
    });

    it("has a status", function() {
      expect(prompt.status).toBe('#status');
    });

    describe("prototype.setToPreGame", function() {
      it("shows the select a player buttons", function() {
        prompt.setToPreGame();
        expect(prompt.playerButtons).toBeVisible();
      });

      it("hides the reset button", function() {
        prompt.setToPreGame();
        expect(prompt.resetButton).toBeHidden();
      });
    });

    describe("prototype.setToGameUnderway", function() {
      it("hides the select a player buttons", function() {
        prompt.setToGameUnderway();
        expect(prompt.playerButtons).toBeHidden();
      });

      it("shows the reset button", function() {
        prompt.setToGameUnderway();
        expect(prompt.resetButton).toBeVisible();
      });
    });

    describe("prototype.setStatusText", function() {
      it("sets the text of the status element", function() {
        var text = "test";
        prompt.setStatusText(text);
        expect(prompt.status).toHaveHtml('<span>' + text + '</span>');
      }); 
    });

    describe("prototype.loading", function() {
      it("sets the status element to a spinner gif", function() {
        var text = "test";
        prompt.loading();
        expect(prompt.status).toHaveHtml('<img src="img/ajax-loader.gif" alt="loader">');
      }); 
    });
  });
});
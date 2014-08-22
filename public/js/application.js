require(["prompt", "game"], function(Prompt, Game) {
  $(document).ready(function() {
    game = new Game;
    prompt = new Prompt;
    game.start();

    $('#human').on('click', function() {
      prompt.setStatusText('Go');   
      game.board.unlock();
    });

    $('#ai').on('click', function() {
      game.computerMove();
    });

    $('.player-buttons').on('click', function() {
      prompt.setToGameUnderway();
    });

    $('table').on('click', 'td', function() {
      if($(this).html() === "" && game.board.locked === false) {
        game.board.lock();
        game.makeHumanMove($(this));
        game.computerMove();
      }
    });

    $('#reset').on('click', function() {
      game.start();
    });
  });
});

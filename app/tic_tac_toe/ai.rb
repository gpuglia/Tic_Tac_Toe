module Tic_Tac_Toe
  module Ai

    module_function

    def find_best_move(game, depth = 0)
      moves = game.available_moves.shuffle
      # minimum_rating = MINIMUM_RATING
      minimum_rating = WINNING_SCORE + 1
      best_move = 0

      moves.each do |move|
        game.move(move)
        current_rating = evaluate_position(game, depth)
        if current_rating < minimum_rating
          best_move = move
          minimum_rating = current_rating
        end
        game.undo_move(move)
      end

      return { move: best_move, rating: -minimum_rating }
    end

    private

    module_function

    def evaluate_position(game, depth)
      return game.score + depth if game.over?
      find_best_move(game, depth + 1)[:rating]
    end

  end
end


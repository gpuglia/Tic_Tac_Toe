module Tic_Tac_Toe
  class Ai
    # MINIMUM_RATING = 11

    def initialize
      @best_move = nil
    end

    def find_best_move(game)
      puts "RECURSION"
      moves = game.available_moves
      print "available moves: "
      p moves
      minimum_rating = 11

      moves.each do |move|
        p move
        p game.current_turn
        game.move!(move)
        p game.state
        current_rating = evaluate_position(game)
        # p game.state
        if current_rating < minimum_rating
          puts "changing best move"
          @best_move = move
          puts "current rating: #{current_rating}"
          minimum_rating = current_rating
        end
        game.undo_move!(move)
      end
      # p best_move
      # p "min rating: #{minimum_rating}"

      return { move: @best_move, rating: -minimum_rating }
    end

    def evaluate_position(game)
      return game.score if game.over?
      find_best_move(game)[:rating]
    end

  end
end

require_relative 'board.rb'
require_relative 'game.rb'

board = Tic_Tac_Toe::Board.new(["X", "", "X", "", "O", "", "", "", ""])
game = Tic_Tac_Toe::Game.new(state: board)
computer = Tic_Tac_Toe::Ai.new

p computer.find_best_move(game)
p "!!!!!!!!!!"
p game.state
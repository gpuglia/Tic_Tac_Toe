module Tic_Tac_Toe
  class Ai
    def initialize
      puts "Computer created"
    end

    def find_best_move(board)
      moves = available_moves(board)
      minimum_rating = 11

      moves.each do |move|
        board = make_move(board, move)
        current_rating = evaluate_position(board)
        if current_rating < minimum_rating
          best_move = move
          minimum_rating = current_rating
        end
      end

      return { move: best_move, rating: -minimum_rating }
    end

    def available_moves(board)
      board.map.with_index { |cell, index|  index + 1 if cell.empty? }.compact 
    end

    def evaluate_position(board)
      return score(board) if game_over?
      find_best_move(board)[:rating]
    end

  end
end
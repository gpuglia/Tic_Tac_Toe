module Tic_Tac_Toe
  class Game
    def initialize(board)
      self.board = board
    end

    def over?
      win?(:human) || win?(:computer)
    end

    def win?(player)
      mark = mark(player)
      check_rows_columns(mark) || check_diagonals(mark)
    end

    def board=(board)
      @board = board.each_slice.to_a
    end
  end
end
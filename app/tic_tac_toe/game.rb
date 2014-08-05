module Tic_Tac_Toe
  class Game
    def initialize(board, current_turn = :computer)
      @board = board
      @current_turn = current_turn
    end

    def over?
      win?(:human) || win?(:computer)
    end

    def win?(player)
      mark = mark(player)
      lines.each { |line| return true if complete_line?(line, mark) }
      return false
    end

    def complete_line?(line, mark)
      line.each do |elem|
        return false unless elem == mark
      end
      return true
    end
    
    def mark(player)
      player == :human ? "X" : "O"
    end

    private

    def board=(board)
      @board = board.each_slice(3).to_a
    end
  end
end
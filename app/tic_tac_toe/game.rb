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
      lines.each { |line| return true if complete_line?(line, mark) }
      return false
    end

    def lines
      rows = @board
      columns = @board.transpose
      rows + columns + diagonals
    end

    def complete_line?(line, mark)
        line.each do |elem|
          return false unless elem == mark
        end
        return true
    end
    
    def diagonals
      diagonal_1 = []  
      diagonal_2 = []  

      @board.each_with_index do |row, i|
        diagonal_1 << row[i]
        diagonal_2 << row[2 - i]
      end

      return [diagonal_1, diagonal_2]
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
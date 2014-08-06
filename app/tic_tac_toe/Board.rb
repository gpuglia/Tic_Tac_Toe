module Tic_Tac_Toe
  class Board
    attr_reader :board
    
    def initialize(array)
      self.board = array
    end

    def rows
      @board
    end

    def columns
      @board.transpose
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

    def lines
      rows + columns + diagonals
    end

    private

    def board=(array)
      @board = array.each_slice(3).to_a
    end
  end
end
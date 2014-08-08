module Tic_Tac_Toe
  class Board
    attr_reader :board
    
    def initialize(array)
      self.board = array
    end

    def rows #PRIVATE
      @board
    end

    def columns #PRIVATE
      @board.transpose
    end

    def diagonals #PRIVATE
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

    def insert_at(mark, index)
      @board[coordinates(index).first][coordinates(index).last] = mark
    end

    def to_a
      @board.flatten
    end

    private

    def coordinates(index)
      row = (index - 1) / 3
      column = (index - 1) % 3
      return [row, column]
    end

    def board=(array)
      @board = array.each_slice(3).to_a
    end
  end
end
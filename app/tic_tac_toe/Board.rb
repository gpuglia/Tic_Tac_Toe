module Tic_Tac_Toe
  class Board
    attr_reader :side

    def initialize(array, side = 3)
      @side = side
      self.board = array
    end

    def lines
      rows + columns + diagonals
    end

    def insert_mark_at(mark, space)
      @board[coordinates(space).first][coordinates(space).last] = mark
    end

    def to_a
      @board.flatten
    end

    private

    def board=(array)
      @board = array.each_slice(@side).to_a
    end

    def coordinates(space)
      row = (space - 1) / @side
      column = (space - 1) % @side
      return [row, column]
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
        diagonal_2 << row[(@side - 1) - i]
      end

      return [diagonal_1, diagonal_2]
    end
  end
end
module Tic_Tac_Toe
  class Game
    attr_reader :state

    def initialize(args)
      @state = args[:state]
      @current_turn = args[:current_turn] || :computer
    end

    def over?
      win?(:human) || win?(:computer)
    end

    def win?(player)
      mark = mark(player)
      @state.lines.each { |line| return true if complete_line?(line, mark) }
      return false
    end
    
    def mark(player)
      player == :human ? "X" : "O"
    end

    def available_moves
      @state.board.flatten.map.with_index { |cell, index|  index + 1 if cell.empty? }.compact 
    end

    def move!(index)
      row = (index - 1) / 3
      column = (index - 1) % 3
      @state.board[row][column] = mark(@current_turn)
    end

    private

    def complete_line?(line, mark)
      line.each do |elem|
        return false unless elem == mark
      end
      return true
    end

  end
end
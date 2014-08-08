module Tic_Tac_Toe
   WINNING_SCORE = 100
    LOOSING_SCORE = -100
    DRAW_SCORE = 0
  class Game
   

    attr_reader :state, :current_turn

    def initialize(state)
      @state = Board.new(state)
      @current_turn = :computer
    end

    def over?
      return true if available_moves.size == 0
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
      @current_turn = opponent
    end

    def undo_move!(index)
      row = (index - 1) / 3
      column = (index - 1) % 3
      @state.board[row][column] = ""
      @current_turn = opponent
    end

    def opponent
      @current_turn == :human ? :computer : :human
    end

    def score
      if win?(@current_turn)
        WINNING_SCORE
      elsif win?(opponent)
        LOOSING_SCORE
      else
        DRAW_SCORE
      end
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
module Tic_Tac_Toe
    WINNING_SCORE = 100
    LOSING_SCORE = -100
    DRAW_SCORE = 0
  class Game
   
    attr_reader :state, :current_turn

    def initialize(state)
      @state = Board.new(state)
      @current_turn = :computer
    end

    def over?
      available_moves.empty? || win?(:human) || win?(:computer)
    end

    def available_moves
      @state.to_a.map.with_index { |cell, index|  index + 1 if cell.empty? }.compact 
    end

    def move(space, mark = mark(@current_turn))
      @state.insert_mark_at(mark, space)
      @current_turn = opponent
    end

    def undo_move(space)
      move(space, "")
    end

    def score
      if win?(@current_turn)
        WINNING_SCORE
      elsif win?(opponent)
        LOSING_SCORE
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

    def win?(player) 
      mark = mark(player)
      @state.lines.each { |line| return true if complete_line?(line, mark) }
      return false
    end

    def opponent 
      @current_turn == :human ? :computer : :human
    end

    def mark(player)
      player == :human ? "X" : "O"
    end

  end
end
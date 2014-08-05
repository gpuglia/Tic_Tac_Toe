module Tic_Tac_Toe
  class Game
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

    private

    def complete_line?(line, mark)
      line.each do |elem|
        return false unless elem == mark
      end
      return true
    end

  end
end
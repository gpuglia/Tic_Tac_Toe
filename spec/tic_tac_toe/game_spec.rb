require 'spec_helper'

describe 'Tic_Tac_Toe' do 
  describe 'Game' do
    let(:game) { Tic_Tac_Toe::Game.new(["X", "", "X", "", "O", "", "", "", ""]) }

    describe '#complete_line?' do
      context 'for a complete line' do
        specify { game.complete_line?(["X", "X", "X"], "X").should be_true }
      end

      context 'for an incomplete line' do
        specify { game.complete_line?(["X", "O", "X"], "X").should be_false }
      end
    end

    describe '#win?' do
      context 'when there is a winner' do
        before { @game = Tic_Tac_Toe::Game.new(["X", "", "X", "", "X", "", "", "", "X"]) }
        specify { @game.win?(:human).should be_true }
      end

      context 'whe there is no winner' do
        specify { game.win?(:human).should be_false }
      end
    end

    describe '#over?' do
      context 'when the human player wins' do
        before { @game = Tic_Tac_Toe::Game.new(["X", "", "X", "", "X", "", "", "", "X"]) }
        specify { @game.over?.should be_true }        
      end

      context 'when the computer wins' do
        before { @game = Tic_Tac_Toe::Game.new(["O", "O", "O", "", "X", "", "", "", "X"]) }
        specify { @game.over?.should be_true }
      end

      context 'when there is no winner' do
        specify { game.over?.should be_false }
      end
    end
  end
end
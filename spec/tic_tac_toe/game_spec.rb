require 'spec_helper'

describe 'Tic_Tac_Toe' do 
  WINNING_SCORE = 100
  LOSING_SCORE = -100
  DRAW_SCORE = 0

  describe 'Game' do
    let(:game) do
      Tic_Tac_Toe::Game.new(["X", "", "X", "", "O", "", "", "", ""])  
    end

    let(:human_win_game) do 
      game = Tic_Tac_Toe::Game.new(["X", "O", "X", "O", "X", "O", "O", "X", "X"])
    end

    let(:computer_win_game) do 
      game = Tic_Tac_Toe::Game.new(["X", "X", "", "O", "O", "O", "", "O", "X"])
    end

    describe '#over?' do
      context 'when the human player wins' do
        specify { human_win_game.over?.should be_true }        
      end

      context 'when the computer wins' do
        specify { computer_win_game.over?.should be_true }
      end

      context 'when it is a draw' do
        
      end

      context 'when there is not over' do
        specify { game.over?.should be_false }
      end
    end

    describe '#available_moves' do
      it 'returns and array of available moves' do
        expect(game.available_moves).to eq([2, 4, 6, 7, 8, 9])
      end 
    end

    describe '#score' do
      before do 
        human_win_game.instance_variable_set(:@current_turn, :human) 
        computer_win_game.instance_variable_set(:@current_turn, :human) 
      end

      context 'when the current player wins' do 
        it 'returns the winning score' do
          expect(human_win_game.score).to eq(WINNING_SCORE)
        end
      end

      context 'when the current player loses' do
        it 'returns the losing score' do
          expect(computer_win_game.score).to eq(LOSING_SCORE)
        end
      end
    end

    describe '#first_turn?' do
      context 'when it is the first turn' do
        let(:game) { Tic_Tac_Toe::Game.new(["", "", "", "", "", "", "", "", ""]) }
        specify { game.first_turn?.should be_true }
      end

      context 'when it is not the first turn' do
        let(:game) { Tic_Tac_Toe::Game.new(["X", "", "", "", "", "", "", "", ""]) }
        specify { game.first_turn?.should be_false }
      end
    end
  end
end
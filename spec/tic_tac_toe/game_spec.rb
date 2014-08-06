require 'spec_helper'

describe 'Tic_Tac_Toe' do 
  describe 'Game' do
    let(:game) do
      board = Tic_Tac_Toe::Board.new(["X", "", "X", "", "O", "", "", "", ""])
      Tic_Tac_Toe::Game.new(state: board)  
    end

    let(:human_win_game) do 
      board = Tic_Tac_Toe::Board.new(["X", "", "X", "", "X", "", "", "", "X"])
      game = Tic_Tac_Toe::Game.new(state: board)
    end

    let(:computer_win_game) do 
      board = Tic_Tac_Toe::Board.new(["X", "", "X", "", "X", "", "", "", "X"])
      game = Tic_Tac_Toe::Game.new(state: board)
    end


    describe '#complete_line?' do

      context 'for a complete line' do
        specify { game.send(:complete_line?, ["X", "X", "X"], "X").should be_true }
      end

      context 'for an incomplete line' do
        specify { game.send(:complete_line?, ["X", "O", "X"], "X").should be_false }
      end
    end
   
    describe '#win?' do
      context 'when there is a winner' do
        specify { human_win_game.win?(:human).should be_true }
      end

      context 'whe there is no winner' do
        specify { game.win?(:human).should be_false }
      end
    end

    describe '#over?' do
      context 'when the human player wins' do
        specify { human_win_game.over?.should be_true }        
      end

      context 'when the computer wins' do
        specify { computer_win_game.over?.should be_true }
      end

      context 'when there is no winner' do
        specify { game.over?.should be_false }
      end
    end

    describe '#available_moves' do
      it 'returns and array of available moves' do
        expect(game.available_moves).to eq([2, 4, 6, 7, 8, 9])
      end 
    end

    describe '#move' do
      context "when it's the human player's turn"
        xit "inserts 'X' in the specified index" do
          board = Tic_Tac_Toe::Board.new(["X", "", "X", "", "O", "", "", "", ""])
          game = Tic_Tac_Toe::Game.new(state: board)
          game.instance_variable_set(:@current_turn, :human) 
          p game.state.board
          expect { game.move!(2) }.to change { game.state.board }
            .from([["X", "", "X"], ["", "O", ""], ["", "", ""]])
            .to([["X", "X", "X"], ["", "O", ""], ["", "", ""]])
          # p game.state.board
        end
    end
  end
end
require 'spec_helper'

describe 'Tic_Tac_Toe' do
  describe 'Ai' do

    describe '#find_best_move' do
      context 'when there is an immediate possibility of winning' do
        it 'returns the move that wins in the immediate turn' do
          board = Tic_Tac_Toe::Board.new(["X", "", "O", "", "O", "X", "", "X", ""])
          game = Tic_Tac_Toe::Game.new(board)

          expect(Tic_Tac_Toe::Ai.find_best_move(game)).to eq({:move=>7, :rating=>100})
        end
      end

      context 'when there is an immediate possibility of losing' do
        it "returns the move that blocks the opponent's win" do
          board = Tic_Tac_Toe::Board.new(["X", "X", "", "", "O", "", "", "", ""])
          game = Tic_Tac_Toe::Game.new(board)

          expect(Tic_Tac_Toe::Ai.find_best_move(game)[:move]).to eq(3)
        end
      end

      context 'when there is an immediate chance of winning or loosing' do
        it 'returns the move that wins in the immediate turn' do
          board = Tic_Tac_Toe::Board.new(["X", "", "X", "", "O", "O", "", "", "X"])
          game = Tic_Tac_Toe::Game.new(board)

          expect(Tic_Tac_Toe::Ai.find_best_move(game)).to eq({:move=>4, :rating=>100})
        end
      end
    end
  end  
end
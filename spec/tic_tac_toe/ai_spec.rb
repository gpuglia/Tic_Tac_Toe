require 'spec_helper'

describe 'Tic_Tac_Toe' do
  describe 'Ai' do
    describe '#find_best_move' do
      let(:game) { Tic_Tac_Toe::Game.new(["X", "X", "O", "X", "O", "", "", "", ""]) }
      let(:ai) { Tic_Tac_Toe::Ai }

      it 'sends a message to get the available moves' do
        expect(game).to receive(:available_moves).at_least(:once).and_call_original
        ai.find_best_move(game)
      end

      context 'for the first turn in the game' do
        before { game.stub(:first_turn?) { true } }
          
        it 'returns a random move from the available moves' do
          move = ai.find_best_move(game)[:move]
          expect(game.available_moves).to include(move)
        end

        it 'returns a move with rating nil' do
          rating = ai.find_best_move(game)[:rating]
          expect(rating).to eq(nil)
        end
      end

      context 'when simulating moves' do
        before { @moves = game.available_moves }
        after { ai.find_best_move(game) }

        it 'simulates every available move' do
          @moves.each do |move|
            expect(game).to receive(:move).with(move).at_least(:once).and_call_original
            expect(game).to receive(:move).with(move, "").at_least(:once).and_call_original
          end
        end 

        it 'evaluates the position after each move' do
          expect(ai).to receive(:evaluate_position).at_least(@moves.size).and_call_original
        end

        it 'undoes the moves simulated' do
          @moves.each do |move|
            expect(game).to receive(:undo_move).with(move).at_least(:once).and_call_original
          end
        end
      end

      context 'when there is an immediate possibility of winning' do
        it 'returns the move that wins in the immediate turn' do
          game = Tic_Tac_Toe::Game.new(["X", "", "O", "", "O", "X", "", "X", ""])
          expect(ai.find_best_move(game)).to eq({:move=>7, :rating=>100})
        end
      end

      context 'when there is an immediate possibility of losing' do
        it "returns the move that blocks the opponent's win" do
          game = Tic_Tac_Toe::Game.new(["X", "X", "", "", "O", "", "", "", ""])
          expect(ai.find_best_move(game)[:move]).to eq(3)
        end
      end

      context 'when there is an immediate chance of winning or loosing' do
        it 'returns the move that wins in the immediate turn' do
          game = Tic_Tac_Toe::Game.new(["X", "", "X", "", "O", "O", "", "", "X"])
          expect(ai.find_best_move(game)).to eq({:move=>4, :rating=>100})
        end
      end

      context 'when there is neither a chance of winning nor losing' do
        it 'returns a neutral move' do
          move = ai.find_best_move(game)[:move]
          expect(game.available_moves).to include(move)
        end
      end 
    end
  end  
end
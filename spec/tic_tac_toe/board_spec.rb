require 'spec_helper'

describe 'Tic_Tac_Toe' do
  describe 'Board' do
    let(:board) { Tic_Tac_Toe::Board.new(["X", "", "X", "", "O", "", "", "", ""]) }

    describe '#rows' do
      it 'returns an array of the rows of the board' do
        expect(board.rows).to eq([["X", "", "X"], ["", "O", ""], ["", "", ""]])
      end 
    end

    describe '#columns' do
      it 'returns an array of the columns of the board' do
        expect(board.columns).to eq([["X", "", ""], ["", "O", ""], ["X", "", ""]])
      end
    end

    describe '#diagonals' do
      it 'returns the diagonals of the board' do
        expect(board.diagonals).to eq([["X", "O", ""], ["X", "O", ""]])
      end 
    end

    describe '#lines' do
      it 'returns an array of the rows, columns and diagonals of the board' do
        expect(board.lines).to eq([["X", "", "X"], ["", "O", ""], ["", "", ""], ["X", "", ""], ["", "O", ""], ["X", "", ""], ["X", "O", ""], ["X", "O", ""]])
      end
    end
  end
end
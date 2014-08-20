require 'spec_helper'

describe 'Tic_Tac_Toe' do
  describe 'Board' do
    let(:board) { Tic_Tac_Toe::Board.new(["X", "", "X", "", "O", "", "", "", ""]) }

    it 'has a default side of 3' do
      expect(board.side).to eq(3)
    end
    describe '#lines' do
      it 'returns an array of the rows, columns and diagonals of the board' do
        expect(board.lines).to eq([["X", "", "X"], ["", "O", ""], ["", "", ""], ["X", "", ""], ["", "O", ""], ["X", "", ""], ["X", "O", ""], ["X", "O", ""]])
      end
    end

    describe '#to_a' do 
      it 'returns the board as a one-dimensional array' do
        expect(board.to_a).to eq(["X", "", "X", "", "O", "", "", "", ""])
      end
    end

    describe '#insert_mark_at' do
      it 'places the mark in the given space' do
        board.insert_mark_at('O', 8)
        expect(board.instance_variable_get(:@board)).to eq([["X", "", "X"], ["", "O", ""], ["", "O", ""]])
      end
    end
  end
end
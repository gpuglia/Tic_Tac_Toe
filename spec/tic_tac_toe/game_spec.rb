require 'spec_helper'

describe 'Tic_Tac_Toe' do 
  describe 'Game' do
    let(:game) { Tic_Tac_Toe::Game.new(["X", "", "X", "", "O", "", "", "", ""]) }
  end
end
get '/' do
	# computer = Tic_Tac_Toe::Ai.new
  erb :index
end

post '/computer_move' do
  board = Tic_Tac_Toe::Board.new(params[:board])
  game = Tic_Tac_Toe::Game.new(board)
  Tic_Tac_Toe::Ai.find_best_move(game).to_json
end
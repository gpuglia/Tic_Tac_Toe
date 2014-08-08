get '/' do
  erb :index
end

get '/computer_move' do
  game = Tic_Tac_Toe::Game.new(params[:board])
  Tic_Tac_Toe::Ai.find_best_move(game).to_json
end
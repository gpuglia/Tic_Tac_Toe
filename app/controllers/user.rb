before '/user/*' do
	#DOES THIS EVEN DO ANYTHING?
	if session[:user_id] != (User.find(session[:user_id])).id
		redirect '/' #return to root because you are not supposed to be here
	end
end

get '/home' do
	erb :user_home
end

get '/logout' do
	session.clear
	redirect to '/'
end
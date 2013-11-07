get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/profile' do
  erb :profile
end

get '/login' do
  erb :_login
end

get '/create_user' do
  erb :_create_user
end

post '/create_user' do
  user = User.new(user_name: params[:user_name], password: params[:password])
  if user.save
    session[:user_id] = user.id
    redirect '/profile'
  else
    redirect '/'
  end
end

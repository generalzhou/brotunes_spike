get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/ui' do
  erb :user_interface
end

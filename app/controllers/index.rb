get '/' do
  # Look in app/views/index.erb
  redirect '/ui'
end

get '/ui' do
  erb :user_interface
end

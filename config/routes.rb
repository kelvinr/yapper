Rails.application.routes.draw do
  match '*all' => 'api#preflight', via: [:options]

  get 'current_user' => 'api#current_user'
  get 'request_token' => 'tokens#request_token'
  get 'access_token' => 'tokens#access_token'

  resources :blabs, only: [:index, :create]

  match '*all' => 'api#index', via: [:get]
end

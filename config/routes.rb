Rails.application.routes.draw do
  match '*all' => 'api#preflight', via: [:options]
  resources :blabs, only: [:index]
end

Rails.application.routes.draw do
  devise_for :users
  # devise_for :installs
  # get 'messages/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root "messages#index"
  root "groups#index"
  resources :users, only: [:edit, :update, :destroy]
  resources :groups, only: [ :index, :new, :create, :edit, :update, :show ] do
    resources :messages, only: [ :index, :create  ]
  end
end

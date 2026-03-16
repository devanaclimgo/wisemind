Rails.application.routes.draw do
  devise_for :users,
  path: "",
  path_names: {
    sign_in: "login",
    sign_out: "logout",
    registration: "signup"
  },
  controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }

  get "up" => "rails/health#show", as: :rails_health_check
  get "/health", to: proc { [200, {}, ["ok"]] }

  namespace :api do
    namespace :v1 do
      resources :weeks, only: [:index, :show, :create, :destroy]
      resources :day_entries, only: [:update]
    end
  end
end

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
  get "/ping", to: proc { [200, {}, ["pong"]] }

  namespace :api do
    namespace :v1 do
      resources :weeks, only: [:index, :show, :create, :destroy]
      resources :day_entries, only: [:update]
    end
  end

  match "*path", via: [:options], to: proc {
    [200, {
      "Access-Control-Allow-Origin" => ENV.fetch("FRONTEND_URL", "*"),
      "Access-Control-Allow-Methods" => "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers" => "Origin, Content-Type, Accept, Authorization",
    }, [""]]
  }
end

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://ancora-front-production.up.railway.app"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ["Authorization"],
      max_age: 600,
      credentials: true
  end
end
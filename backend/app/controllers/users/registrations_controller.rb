class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def sign_up(resource_name, resource)
     # Don't sign in the user after sign up
     # This is important to prevent the JWT from being dispatched immediately after registration
     # and allows the client to handle the login process separately if needed.
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        message: 'Signed up successfully',
        user: resource
      }, status: :ok
    else
      render json: {
        message: "User couldn't be created",
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
end
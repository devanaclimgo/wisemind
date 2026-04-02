class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?

  respond_to :json

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:login])
  end
end

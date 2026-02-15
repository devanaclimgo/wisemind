class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Null

  devise :database_authenticatable,
         :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null
end
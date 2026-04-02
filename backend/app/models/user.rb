class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Null

  devise :database_authenticatable,
         :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  has_many :weeks, -> { order(:created_at) }, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true

  attr_writer :login

  def login
    @login || self.username || self.email
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup

    login = conditions.delete(:login)

    return nil unless login.present?

    where(
      ["lower(username) = :value OR lower(email) = :value", { value: login.downcase }]
    ).first
  end
end
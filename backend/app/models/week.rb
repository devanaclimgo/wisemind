class Week < ApplicationRecord
  belongs_to :user
  has_many :day_entries, dependent: :destroy

  after_create :generate_days

  validates :start_date, presence: true

  private

  def generate_days
    7.times do |i|
      day_entries.create!(
        day_number: i + 1
      )
    end
  end
end
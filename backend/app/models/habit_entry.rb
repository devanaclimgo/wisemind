class HabitEntry < ApplicationRecord
  belongs_to :user

  validates :date, presence: true
  validates :habit_name, presence: true
end
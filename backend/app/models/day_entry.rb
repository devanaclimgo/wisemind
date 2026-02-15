class DayEntry < ApplicationRecord
  belongs_to :week

  validates :day_number, presence: true,
                         inclusion: { in: 1..7 }
end
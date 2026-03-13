class Week < ApplicationRecord
  belongs_to :user
  has_many :day_entries, -> { order(:day_number) }, dependent: :destroy

  # TODO: adicionar ordenação por criação do card, para aparecer o mais recente primeiro

  after_create :generate_days

  validates :start_date, presence: true

  def end_date
    start_date + 6.days
  end

  private

  def generate_days
    7.times do |i|
      day_entries.create!(
        day_number: i + 1
      )
    end
  end
end
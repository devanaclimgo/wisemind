class Week < ApplicationRecord
  belongs_to :user
  has_many :day_entries, dependent: :destroy
  has_many :day_entries, -> { order(:day_number) }

  # TODO: adicionar ordenação por criação do card, para aparecer o mais recente primeiro
  has_many :weeks, -> { order(:created_at) }

  # TODO: refatorar ordem da data para dia/mes/ano, para ficar mais intuitivo para o usuário
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
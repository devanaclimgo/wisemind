class AddHabitsToWeeks < ActiveRecord::Migration[8.1]
  def change
    add_column :weeks, :habits, :jsonb
  end
end

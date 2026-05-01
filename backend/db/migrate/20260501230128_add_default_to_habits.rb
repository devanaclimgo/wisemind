class AddDefaultToHabits < ActiveRecord::Migration[8.1]
  def change
    change_column_default :weeks, :habits, []
  end
end

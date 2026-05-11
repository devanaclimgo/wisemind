class CreateHabitEntries < ActiveRecord::Migration[8.1]
  def change
    create_table :habit_entries do |t|
      t.references :user, null: false, foreign_key: true
      t.date :date, null: false
      t.string :habit_name, null: false
      t.boolean :done, default: false
      t.timestamps
    end
  end
end
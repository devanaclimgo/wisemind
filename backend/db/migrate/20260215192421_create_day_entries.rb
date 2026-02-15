class CreateDayEntries < ActiveRecord::Migration[8.1]
  def change
    create_table :day_entries do |t|
      t.references :week, null: false, foreign_key: true
      t.integer :day_number
      t.text :sleep_notes
      t.text :health_notes
      t.text :exercise_notes
      t.text :food_notes
      t.text :substances_notes
      t.text :extra_notes

      t.timestamps
    end
  end
end

class CreateWeeks < ActiveRecord::Migration[8.1]
  def change
    create_table :weeks do |t|
      t.references :user, null: false, foreign_key: true
      t.date :start_date
      t.date :end_date
      t.boolean :completed

      t.timestamps
    end
  end
end

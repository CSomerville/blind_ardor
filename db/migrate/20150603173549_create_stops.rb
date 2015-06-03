class CreateStops < ActiveRecord::Migration
  def change
    create_table :stops do |t|
      t.integer :tree_id
      t.integer :trail_id
      t.integer :stop_num
    end
  end
end

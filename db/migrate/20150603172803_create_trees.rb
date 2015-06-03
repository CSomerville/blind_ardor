class CreateTrees < ActiveRecord::Migration
  def change
    create_table :trees do |t|
      t.string :street
      t.integer :building_number
      t.string :building_street
      t.integer :zip
      t.integer :condition
      t.integer :diameter
      t.string :species
      t.string :borough
      t.decimal :lat
      t.decimal :long
    end
  end
end

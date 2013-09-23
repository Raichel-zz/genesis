class CreateDecals < ActiveRecord::Migration
  def change
    create_table :decals do |t|
      t.integer "user_id"
      t.integer "theme_id"
      t.integer "theme_x"
      t.integer "theme_y"
      t.integer "background_id"
      t.string "main_text"
      t.string "sub_text"      
      t.timestamps
    end
  end
end

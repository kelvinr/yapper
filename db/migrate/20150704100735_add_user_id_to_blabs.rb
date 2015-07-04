class AddUserIdToBlabs < ActiveRecord::Migration
  def change
    add_column :blabs, :user_id, :integer, index: true
  end
end

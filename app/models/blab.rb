class Blab < ActiveRecord::Base
  include Jsonify

  belongs_to :user

  validates_presence_of :content

  def to_hash
    {id: id, content: content, handle: user.handle}
  end
end

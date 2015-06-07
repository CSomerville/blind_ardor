class Trail < ActiveRecord::Base
  has_many :stops
  has_many :trees, through: :stops
end
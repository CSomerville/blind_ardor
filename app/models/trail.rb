class Trail < ActiveRecord::Base
  has_many :stops
  has_many :trails, through: :stops
end
class Stop < ActiveRecord::Base
  belongs_to :trees
  belongs_to :trails
end
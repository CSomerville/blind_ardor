class Stop < ActiveRecord::Base
  belongs_to :tree
  belongs_to :trail
end
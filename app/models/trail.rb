class Trail < ActiveRecord::Base
  has_many :stops
  has_many :trees, through: :stops

  def self.search(params)
    bounds = params[:bounds]
    Trail.includes(:trees)
      .with_species(params[:species])
      .where(trees: {lat: bounds[:s]..bounds[:n], long: bounds[:w]..bounds[:e]}).all
  end

  scope :with_species, ->(species) do
    if species.present?
      where(trees: {species: species})
    end
  end

end
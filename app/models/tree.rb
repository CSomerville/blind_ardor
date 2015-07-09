class Tree < ActiveRecord::Base
  has_many :stops
  has_many :trails, through: :stops

  def self.search(params)
    with_species(params[:species])
      .with_diameter(params[:diameter])
      .where(lat: params[:s]..params[:n]).where(long: params[:w]..params[:e]).take(100)
  end

  scope :with_species, ->(species) {
    if species.present?
      where(species: species)
    end
  }

  scope :with_diameter, ->(diameter) {
    if diameter.present?
      where(species: species)
    end
  }
end
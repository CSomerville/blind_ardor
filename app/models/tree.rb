class Tree < ActiveRecord::Base
  has_many :stops
  has_many :trails, through: :stops

  def self.search(params)
    with_species(params[:species])
      .with_diameter(params[:diameter])
      .where(lat: params[:s]..params[:n]).where(long: params[:w]..params[:e]).take(100)
  end

  scope :with_species, ->(species) do
    if species.present?
      where(species: species)
    end
  end

  scope :with_diameter, ->(diameter) do
    if diameter.present?
      case diameter
      when 'xs'
        where(diameter: 1..6)
      when 's'
        where(diameter: 7..12)
      when 'm'
        where(diameter: 13..36)
      when 'l'
        where(diameter: 37..1000)
      end
    end    
  end

end
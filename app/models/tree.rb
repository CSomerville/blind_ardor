class Tree < ActiveRecord::Base
  has_many :stops
  has_many :trails, through: :stops

  def self.search(params)
    query = Tree.all

    query = query.where(lat: params[:s]..params[:n]).where(long: params[:w]..params[:e]).take(100)

    query = query.where(species: params[:species]) if params[:species].present?

    query = query.where(diameter: params[:diameter]) if params[:diameter].present?

    query
  end
end
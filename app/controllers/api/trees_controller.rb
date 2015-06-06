module Api
  class TreesController < ApplicationController

    def index
      render json: Tree.where(species: params[:species]).where(lat: params[:n]..params[:s]).where(long: params[:w]..params[:e]).take(100)
    end

  end
end
module Api
  class TreesController < ApplicationController

    def index
      render json: Tree.where(species: params[:species]).where(lat: params[:s]..params[:n]).where(long: params[:w]..params[:e]).take(100)
    end

  end
end
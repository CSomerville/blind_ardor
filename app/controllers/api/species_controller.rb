module Api
  class SpeciesController < ApplicationController

    def index
      render json: Tree.select(:species).distinct
    end

  end
end
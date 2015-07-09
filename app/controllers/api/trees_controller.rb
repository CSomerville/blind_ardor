module Api
  class TreesController < ApplicationController

    def index
      render json: Tree.search(params)
    end

  end
end
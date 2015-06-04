module Api
  class TreesController < ApplicationController

    def index
      render json: params
    end

  end
end
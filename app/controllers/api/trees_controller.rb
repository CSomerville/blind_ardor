module Api
  class TreesController < ApplicationController

    def index
      render json: Tree.search(params) if coords?(params)
    end

    def coords?(params)
      params[:n].present? && params[:s].present? && params[:e].present? && params[:w].present?
    end

  end
end
module Api
  class TrailsController < ApplicationController

    def index
      all_trails = Trail.all().sort_by { |trail| trail.created_at }
      render json: all_trails.to_json( include: {stops: {include: :tree}} )
    end

    def create

      trail = Trail.new(trail_params)
      trail.save

      new_stop = {}
      params[:stops].each do |stop|
        new_stop[:trail_id] = trail[:id]
        new_stop[:tree_id] = stop[:tree_id]
        new_stop[:stop_num] = stop[:stop_num]
        Stop.create(new_stop)
      end

      render json: :ok
    end
    
    private
      def trail_params
        params.require(:trail).permit(:name)
      end
  end
end
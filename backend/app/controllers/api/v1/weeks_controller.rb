module Api
  module V1
    class WeeksController < BaseController

      def index
        weeks = current_user.weeks.order(start_date: :desc)
        render json: weeks
      end

      def show
        week = current_user.weeks.find(params[:id])
        render json: week, include: :day_entries
      end

      def create
        week = current_user.weeks.new(week_params)

        if week.save
          render json: week, status: :created
        else
          render json: { errors: week.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def week_params
        params.require(:week).permit(:start_date)
      end
    end
  end
end
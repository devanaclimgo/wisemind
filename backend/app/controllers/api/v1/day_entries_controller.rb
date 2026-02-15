module Api
  module V1
    class DayEntriesController < BaseController

      def update
        day_entry = DayEntry
          .joins(:week)
          .where(weeks: { user_id: current_user.id })
          .find(params[:id])

        if day_entry.update(day_entry_params)
          render json: day_entry, status: :ok
        else
          render json: { errors: day_entry.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def day_entry_params
        params.require(:day_entry).permit(
          :sleep_notes,
          :health_notes,
          :exercise_notes,
          :food_notes,
          :substances_notes,
          :extra_notes
        )
      end
    end
  end
end
class BlabsController < ApiController
  def index
    @blabs = Blab.all.order(created_at: :desc)
    render json: @blabs
  end
end

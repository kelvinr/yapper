class BlabsController < ApiController
  before_action :authenticate_request, only: [:create]

  def index
    @blabs = Blab.joins(:user).select(:handle).jsonify(:id, :content, :handle)
    render json: @blabs
  end

  def create
    @blab = Blab.new(blab_params.merge!(user: @current_user))

    if @blab.save
      render json: @blab, status: :created
    else
      render json: @blab.errors, status: :unprocessable_entity
    end
  end

  private

  def blab_params
    params.require(:blab).permit(:content)
  end
end

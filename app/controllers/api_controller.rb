class ApiController < ActionController::Metal
  include AbstractController::Callbacks
  include ActionController::RackDelegation
  include ActionController::StrongParameters

  before_action :authenticate_request, only: [:current_user]

  def preflight
    render nothing: true
  end

  def current_user
    render json: @current_user.handle
  end
  
  private

  def render(options={})
    self.status = options[:status] || 200
    self.content_type = 'application/json'
    body = Oj.dump(options[:json], mode: :compat)
    self.headers['Content-Length'] = body.bytesize.to_s
    self.response_body = body
  end

  def redirect_to(options={})
    self.location = options[:location] || ENV['ORIGIN']
    self.status = options[:status] || 302
  end

  def authenticate_request
    begin
      uid = JWT.decode(request.headers['Authorization'], Rails.application.secrets.secret_key_base)[0]['uid']
      @current_user = User.find_by(uid: uid)
    rescue JWT::DecodeError
      render json: 'authentication failed', status: 401
    end
  end
end

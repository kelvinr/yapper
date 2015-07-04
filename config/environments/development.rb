Rails.application.configure do
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  config.middleware.insert_before 0, "Rack::Cors" do
    allow do
      origins '*'
      resource '*', :headers => :any, :methods => [:get, :post, :options]
    end
  end

  CREDS = YAML.load_file('/home/kelvin/Creds/yapper_api.yml')
  ENV['TWITTER_CONSUMER_KEY'] = CREDS['TCK']
  ENV['TWITTER_CONSUMER_SECRET'] = CREDS['TCS']

  ENV['ORIGIN'] = 'http://localhost:8080'
  ENV['OAUTH_CALLBACK'] = 'http://127.0.0.1:3000/access_token'
end

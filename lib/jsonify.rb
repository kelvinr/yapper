module Jsonify
  def self.included(base)
    base.send(:include, InstanceMethods)
    base.extend ClassMethods
  end

  module InstanceMethods
    def jsonify(*args)
      connection.select_all(select([*args]).arel, nil, all.bind_values).each do |attrs|
        attrs.each do |name, value|
          attrs[name] = column_types[name].send(:type_cast_from_database, value)
        end
      end
    end
  end

  module ClassMethods
    def jsonify(*args)
      connection.select_all(select([*args]).arel, nil, all.bind_values).each do |attrs|
        attrs.each do |name, value|
          attrs[name] = column_types[name].send(:type_cast_from_database, value)
        end
      end
    end
  end
end

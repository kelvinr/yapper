module Jsonify
  def self.included(base)
    base.send(:include, InstanceMethods)
    base.extend ClassMethods
  end

  module InstanceMethods
    def jsonify(*args)
      ar = args.last
      if ar.is_a?(Hash)
        key = ar.keys[0]
        args.delete(ar)
        if ar[key].include?(",")
          assoc = {key => self.send(key).attributes.keep_if{|c| ar[key].include?(c)}}
        else
          assoc = {key => self.send(key).send(ar[key])}
        end
        Hash[args.zip(args.map{|c| self.send(c)})].merge(assoc)
      else
        Hash[args.zip(args.map{|c| self.send(c)})]
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

# require('JSON')
# txt = File.open('./db/raw_species.txt').read


# hash = {}
# txt.each_line do |line|
#   hash[line.split[0]] = line.split[1..-1].join.downcase
# end

# raw = JSON.parse(File.read('./../tree_data/geoJson_by_borough/Bronx.geojson'))

# puts raw["features"][0]

puts Dir['./../tree_data/geoJson_by_borough/*'][2]
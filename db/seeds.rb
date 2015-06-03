# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Tree.delete_all

files = Dir['./../tree_data/geoJson_by_borough/*']

files.each do |file|

  raw = JSON.parse(File.read(file))["features"]
  nicer = {}

  raw.each do |datum|
    nicer[:street] = datum["properties"]["ONSTREET"]
    nicer[:building_number] = datum["properties"]["BUILDINGNU"]
    nicer[:building_street] = datum["properties"]["BUILDINGST"]
    nicer[:zip] = datum["properties"]["ZIPCODE"]
    nicer[:condition] = datum["properties"]["TREECONDIT"]
    nicer[:diameter] = datum["properties"]["DIAMETER"]
    nicer[:species] = datum["properties"]["SPECIES"]
    nicer[:borough] = datum["properties"]["BOROUGH"]
    nicer[:lat] = datum["geometry"]["coordinates"][1]
    nicer[:long] = datum["geometry"]["coordinates"][0]
    Tree.create!(nicer)
  end

end


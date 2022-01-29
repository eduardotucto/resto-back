const Area = require("./models/Area");
const Table = require("./models/Table");
const PreparationArea = require("./models/PreparationArea");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Variant = require("./models/Variant");



/**
 * * Relaciones uno a muchos
 * -> Un salon puede tener muchas mesas ==> se crea areaId en tables
 * -> Una area de preparacion puede tener muchos productos ==> se crea preparationAreaId en products
 * -> Una categoria puede tener muchos productos ==> se crea categoryId en products
 * -> Un producto puede tener muchas presentaciones ==> se crea productId en variants
 */


Area.hasMany(Table);
Table.belongsTo(Area);

PreparationArea.hasMany(Product);
Product.belongsTo(PreparationArea);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Variant);
Variant.belongsTo(Product);
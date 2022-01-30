const Area = require("./models/Area");
const Table = require("./models/Table");
const PreparationArea = require("./models/PreparationArea");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Variant = require("./models/Variant");
const Order = require("./models/Order");
const Sale = require("./models/Sale");
const Detail = require("./models/Detail");



/**
 * * Relaciones uno a muchos
 * -> Un salon puede tener muchas mesas						==> se crea areaId 				en tables
 * -> Una area de preparacion puede tener muchos productos	==> se crea preparationAreaId 	en products
 * -> Una categoria puede tener muchos productos			==> se crea categoryId 			en products
 * -> Un producto puede tener muchas presentaciones			==> se crea productId 			en variants
 * -> Una mesa puede tener muchas ordenes					==> se crea tableId 			en orders
 * -> Una orden puede tener muchas ventas (comprobantes)    ==> se crea orderId 			en sales
 * -> Una orden puede tener muchos detalles                 ==> se crea orderId 			en details
 * -> Un producto puede estar en muchos detalles            ==> se crea productId 			en details
 */


Area.hasMany(Table);
Table.belongsTo(Area);

PreparationArea.hasMany(Product);
Product.belongsTo(PreparationArea);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Variant);
Variant.belongsTo(Product);

Table.hasMany(Order);
Order.belongsTo(Table);

Order.hasMany(Sale);
Sale.belongsTo(Order);

Order.hasMany(Detail);
Detail.belongsTo(Order);

Product.hasMany(Detail);
Detail.belongsTo(Product);

Variant.hasMany(Detail);
Detail.belongsTo(Variant);
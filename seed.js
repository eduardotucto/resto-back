require("dotenv").config();
const sequelize = require("./database/db");
const Area = require("./database/models/Area");
const Table = require("./database/models/Table");
const Category = require("./database/models/Category");
const PreparationArea = require("./database/models/PreparationArea");
const Product = require("./database/models/Product");
const Variant = require("./database/models/Variant");
const Order = require("./database/models/Order");
const Sale = require("./database/models/Sale");
const Detail = require("./database/models/Detail");
require("./database/associations");


const areas = [
	{ nombre: "Salon principal", isEnabled: true },
	{ nombre: "Salon trasero", isEnabled: true },
	{ nombre: "Salon externo", isEnabled: false }
];

const tables = [
	{ areaId: 1, nombre: "Mesa 01", estado: "Disponible", isActive: true },
	{ areaId: 1, nombre: "Mesa 02", estado: "Disponible", isActive: true },
	{ areaId: 1, nombre: "Mesa 03", estado: "Disponible", isActive: true },
	{ areaId: 1, nombre: "Mesa 04", estado: "Disponible", isActive: true },
	{ areaId: 1, nombre: "Mesa 05", estado: "Disponible", isActive: true },
	{ areaId: 1, nombre: "Mesa 06", estado: "Disponible", isActive: true },
	{ areaId: 1, nombre: "Mesa 07", estado: "Disponible", isActive: true },
	{ areaId: 1, nombre: "Mesa 08", estado: "Disponible", isActive: true },
	{ areaId: 1, nombre: "Mesa 09", estado: "Disponible", isActive: true },
	{ areaId: 2, nombre: "Mesa 01", estado: "Disponible", isActive: true },
	{ areaId: 2, nombre: "Mesa 02", estado: "Disponible", isActive: true },
	{ areaId: 2, nombre: "Mesa 03", estado: "Disponible", isActive: true },
	{ areaId: 3, nombre: "Mesa 01", estado: "Disponible", isActive: true },
	{ areaId: 3, nombre: "Mesa 02", estado: "Disponible", isActive: true }
];

const preparationAreas = [
	{ nombre: "Cocina" },
	{ nombre: "Bar" }
];

const categories = [
	{ descripcion: "Marina"			},
	{ descripcion: "Rapida" 		},
	{ descripcion: "China" 			},
	{ descripcion: "Tradicional" 	},
	{ descripcion: "Gaseosas" 		},
	{ descripcion: "Jugos" 			},
	{ descripcion: "Cervezas" 		}
];

const products = [
	{ nombre: "Ceviche", 			categoryId: 1, isActive: false,	isInventoryTracked: false, 	preparationAreaId: 1 },
	{ nombre: "Chaufa", 			categoryId: 3, isActive: true, 	isInventoryTracked: false, 	preparationAreaId: 1 },
	{ nombre: "Chicharron", 		categoryId: 4, isActive: true, 	isInventoryTracked: false, 	preparationAreaId: 1 },
	{ nombre: "Aji de Gallina", 	categoryId: 4, isActive: true, 	isInventoryTracked: false, 	preparationAreaId: 1 },
	{ nombre: "Lomo Saltado", 		categoryId: 4, isActive: true, 	isInventoryTracked: false, 	preparationAreaId: 1 },
	{ nombre: "Cau Cau", 			categoryId: 4, isActive: true, 	isInventoryTracked: false, 	preparationAreaId: 1 },
	{ nombre: "Pollo a la Brasa",	categoryId: 2, isActive: true, 	isInventoryTracked: false, 	preparationAreaId: 1 },
	{ nombre: "Hamburguesa", 		categoryId: 2, isActive: true, 	isInventoryTracked: false, 	preparationAreaId: 1 },
	{ nombre: "CocaCola", 			categoryId: 5, isActive: true, 	isInventoryTracked: true, 	preparationAreaId: 2 },
	{ nombre: "Jugo de naranja", 	categoryId: 6, isActive: true, 	isInventoryTracked: false, 	preparationAreaId: 2 },
	{ nombre: "Cristal", 			categoryId: 7, isActive: true, 	isInventoryTracked: true, 	preparationAreaId: 2 }
];

const variants = [
	{ productId: 1, descripcion: "Unico", 			stock: 0, 	price: 12.5	},
	{ productId: 2, descripcion: "Unico", 			stock: 0, 	price: 12 	},
	{ productId: 3, descripcion: "Unico", 			stock: 0, 	price: 20 	},
	{ productId: 4, descripcion: "Unico", 			stock: 0, 	price: 8 	},
	{ productId: 5, descripcion: "Unico", 			stock: 0, 	price: 10 	},
	{ productId: 6, descripcion: "Unico", 			stock: 0, 	price: 10.5 },
	{ productId: 7, descripcion: "Unico", 			stock: 0, 	price: 9.5 	},
	{ productId: 8, descripcion: "Unico", 			stock: 0, 	price: 7 	},
	{ productId: 9, descripcion: "500 ml", 			stock: 8, 	price: 5 	},
	{ productId: 9, descripcion: "1000 ml", 		stock: 16,	price: 10 	},
	{ productId: 9, descripcion: "3000 ml", 		stock: 27, 	price: 15 	},
	{ productId: 10,descripcion: "Vaso pequeño", 	stock: 0, 	price: 5 	},
	{ productId: 10,descripcion: "Vaso grande", 	stock: 0, 	price: 9 	},
	{ productId: 11,descripcion: "Botella 650ml",	stock: 72, 	price: 6 	}
];

const orders = [
	{
		customerName: "", UTC_created_at: 1637642524151, orderState: 2, isInTable: true, tableId: 1, dinersNumber: 2, waiterName: "Eugenia Miller",
		isDelivery: false, isToTakeAway: false, wasCanceled: false, customerAddress: "", addressReference: "", customerPhone: null, amountDue: 47
	},
	{ 
		customerName: "Eduardo", UTC_created_at: 1637643172362, orderState: 1, isInTable: false, isDelivery: true, isToTakeAway: false,
		wasCanceled: false, customerAddress: "jr huallayco", addressReference: "frente colegio leoncio prado", customerPhone: "949521396", amountDue: 26.5 
	},
	{ 
		customerName: "", UTC_created_at: 1637683269191, orderState: 2, isInTable: true, tableId: 1, dinersNumber: 2, waiterName: "Ulises Bruen",
		isDelivery: false, isToTakeAway: false, wasCanceled: true, customerAddress: "", addressReference: "", customerPhone: null, amountDue: 0 
	},
	{ 
		customerName: "pepe", UTC_created_at: 1637728262869, orderState: 1, isInTable: false,
		isDelivery: false, isToTakeAway: true, wasCanceled: false, customerAddress: "", addressReference: "", customerPhone: null, amountDue: 28 
	},
	{ 
		customerName: "", UTC_created_at: 1637729305705, orderState: 2, isInTable: true, tableId: 2, dinersNumber: 2, waiterName: "Eugenia Miller",
		isDelivery: false, isToTakeAway: false, wasCanceled: false, customerAddress: "", addressReference: "", customerPhone: null, amountDue: 52
	 }
];

const sales = [
	{ identificacionCliente: "73600694", orderId: 1, subtotal: 39.83, igv: 7.17, descuento: 0, montoTotal: 47, cuenta: "Normal", tipo: "Efectivo", comprobante: "boleta" },
	{ identificacionCliente: "73600694", orderId: 2, subtotal: 44.07, igv: 7.93, descuento: 0, montoTotal: 52, cuenta: "Normal", tipo: "Efectivo", comprobante: "boleta" },
	{ identificacionCliente: "73600695", orderId: 3, subtotal: 44.07, igv: 7.93, descuento: 0, montoTotal: 52, cuenta: "Normal", tipo: "Efectivo", comprobante: "boleta" },
	{ identificacionCliente: "70135097", orderId: 4, subtotal: 20.34, igv: 3.66, descuento: 0, montoTotal: 24, cuenta: "Normal", tipo: "Efectivo", comprobante: "boleta" }
];

const details = [
	{ sale_price: 25.50, comentario: null, cant: 1, estado: 1, toTakeAway: false, UTC_created_at: 1637642526103, orderId: 1, productId: 4 },
	{ sale_price: 12.45, comentario: null, cant: 1, estado: 1, toTakeAway: false, UTC_created_at: 1637642526424, orderId: 1, productId: 3 },
	{ sale_price: 18.20, comentario: null, cant: 1, estado: 1, toTakeAway: false, UTC_created_at: 1637642526731, orderId: 1, productId: 2 },
	{ sale_price: 17.50, comentario: null, cant: 1, estado: 1, toTakeAway: false, UTC_created_at: 1637642527059, orderId: 1, productId: 9 }
];


const initializeSeeder = async () => {
	try {
		await sequelize.sync({ force: true });
		console.log("Conexión establecida...");

		for (const area of areas) {
			await Area.create(area); // Rellenar salones
		}

		for (const table of tables) {
			await Table.create(table); // Rellenar mesas
		}

		for (const category of categories) {
			await Category.create(category); // Rellenar categorias
		}

		for (const preparationArea of preparationAreas) {
			await PreparationArea.create(preparationArea); // Rellenar areas de preparacion
		}

		for (const product of products) {
			await Product.create(product); // Rellenar productos
		}

		for (const variant of variants) {
			await Variant.create(variant); // Rellenar presentaciones
		}

		for (const order of orders) {
			await Order.create(order); // Rellenar ordenes
		}

		for (const sale of sales) {
			await Sale.create(sale); // Rellenar ventas
		}

		for (const detail of details) {
			await Detail.create(detail); // Rellenar ventas
		}

	} catch (error) {
		console.log(error);
	}
};

initializeSeeder();
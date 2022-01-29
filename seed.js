require("dotenv").config();
const sequelize = require("./database/db");
const Area = require("./database/models/Area");
const Table = require("./database/models/Table");
const Category = require("./database/models/Category");
const PreparationArea = require("./database/models/PreparationArea");
const Product = require("./database/models/Product");
const Variant = require("./database/models/Variant");
require("./database/associations");

// Usuarios
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
			await Variant.create(variant); // Rellenar productos
		}

	} catch (error) {
		console.log(error);
	}
};

initializeSeeder();
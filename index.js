require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./database/db");

require("./database/associations");

// Settings
app.set("port", process.env.PORT || 3000);

// Middleware
    // Para rellenar el req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
	res.send("Hello world!");
});

app.use("/areas", require("./routes/areas"));
app.use("/tables", require("./routes/tables"));
app.use("/categories", require("./routes/categories"));
app.use("/preparationAreas", require("./routes/preparationAreas"));
app.use("/products", require("./routes/products"));
app.use("/variants", require("./routes/variants"));


app.listen(app.get("port"), () => {
	console.log("server on port", app.get("port"));
	sequelize
		.sync({ force: false })
		.then(() => {
			console.log("Connection has been established successfully");
		})
		.catch((err) => {
			console.log("Unable to connect to the database\n", err);
		});
});

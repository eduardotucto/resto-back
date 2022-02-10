require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./database/db");

require("./database/associations");

// Settings
app.set("port", process.env.PORT || 3000);

// Middleware
    // Para rellenar el req.body
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: false }));

// Cors
// const whiteList = ["https://....", "https://...."];app.use(cors({ origin: whiteList }));
app.use(cors());

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
app.use("/orders", require("./routes/orders"));
app.use("/sales", require("./routes/sales"));
app.use("/details", require("./routes/details"));


app.listen(app.get("port"), () => {
	console.log("server on port", app.get("port"));
	sequelize
		.authenticate()
		// .sync({ force: true })
		.then(() => {
			console.log("Connection has been established successfully");
		})
		.catch((err) => {
			console.log("Unable to connect to the database\n", err);
		});
});

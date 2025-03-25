const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const todoRoutes = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 3000;

// Swagger Configuration
const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Todo API",
			version: "1.0.0",
			description: "API Documentation for the Todo App",
		},
	},
	apis: ["server.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/todos", todoRoutes);

// Root route
/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Returns a welcome message
 */
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the Todo API" });
});

// Ping route
/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Check if API is running
 *     responses:
 *       200:
 *         description: API status check
 */
app.get("/ping", (req, res) => {
	res.json({
		message: "Successful ping. App is running.",
		version: "1.0.0",
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;

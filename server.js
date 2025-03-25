const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const todoRoutes = require("./routes/todos");
const swaggerMiddleware = require("./api/docs/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Swagger
swaggerMiddleware(app);

// Routes
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
	res.json({ message: "Welcome to the Todo API" });
});

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

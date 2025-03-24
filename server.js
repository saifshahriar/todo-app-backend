const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const todoRoutes = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/todos", todoRoutes);

// Root route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the Todo API" });
});

// Ping route
app.get("/ping", (req, res) => {
	res.json({
		message: "Successfull ping. App is running.",
		version: "1.0.0",
	});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;

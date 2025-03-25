const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors"); // avoid cors error
const todoRoutes = require("./api/routes/todoRoutes");
const swaggerMiddleware = require("./api/docs/swagger");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Swagger
swaggerMiddleware(app);

// Routes
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
	res.json({ message: "Are you there yet, engineers?" });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

module.exports = app;

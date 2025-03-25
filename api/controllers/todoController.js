const todoModel = require("../models/todoModel");

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: Returns a list of todos
 */
const getAllTodos = async (req, res) => {
	try {
		const result = await todoModel.getAllTodos();
		if (result.rows.length === 0) {
			return res.status(404).json({ message: "No todos found" });
		}
		res.status(200).json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
};

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a single todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a single todo by ID
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
const getTodoById = async (req, res) => {
	try {
		const result = await todoModel.getTodoById(req.params.id);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: "Todo not found" });
		}
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
};

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Title is required
 *       500:
 *         description: Internal server error
 */
const createTodo = async (req, res) => {
	try {
		const { title, description } = req.body;
		if (!title)
			return res.status(400).json({ message: "Title is required" });

		const result = await todoModel.createTodo(title, description);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
};

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - is_completed
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               is_completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       400:
 *         description: Missing required fields (title, description, or is_completed)
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
const updateTodo = async (req, res) => {
	try {
		const { title, description, is_completed } = req.body;
		if (!title || !description || is_completed === undefined)
			return res.status(400).json({ message: "All fields are required" });

		const result = await todoModel.updateTodo(
			req.params.id,
			title,
			description,
			is_completed
		);
		if (result.rows.length === 0)
			return res.status(404).json({ message: "Todo not found" });

		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
};

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */
const deleteTodo = async (req, res) => {
	try {
		const result = await todoModel.deleteTodo(req.params.id);
		if (result.rows.length === 0)
			return res.status(404).json({ message: "Todo not found" });

		res.status(200).json({ message: "Todo deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	getAllTodos,
	getTodoById,
	createTodo,
	updateTodo,
	deleteTodo,
};

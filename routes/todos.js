const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all todos
/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: Returns a list of todos
 */
router.get("/", async (req, res, next) => {
	try {
		const sql = "SELECT * FROM todos ORDER BY created_at DESC";
		const result = await db.query(sql);
		if (result.rows.length == 0) {
			res.status(404).json(result.rows);
			return;
		}
		res.status(200).json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal server error");
	}
});

//GET single todo
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
router.get("/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		const sql =
			"SELECT * FROM todos WHERE id  = $1 ORDER BY created_at DESC";
		const params = [id];
		const result = await db.query(sql, params);
		if (result.rows.length == 0) {
			res.status(404).json(result.rows[0]);
			return;
		}
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal server error");
	}
});

//POST one single todo
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
router.post("/", async (req, res, next) => {
	try {
		const { title, description } = req.body;
		if (!title) {
			res.status(400).send({ message: "Title is required" });
			return;
		}
		const sql = `INSERT INTO todos (title,description) values($1,$2)`;
		const params = [title, description];
		const result = db.query(sql, params);
		res.status(201).send(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal server error");
	}
});

//DELETE one single todo
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
router.delete("/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		const sql = "DELETE FROM todos WHERE id  = $1 returning *";
		const params = [id];
		const result = await db.query(sql, params);
		if (result.rows.length == 0) {
			res.status(404).json(result.rows[0]);
			return;
		}
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal server error");
	}
});

//Update one single todo
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
router.put("/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		const { title, description, is_completed } = req.body;
		if (!title) {
			res.status(400).send("title is required");
			return;
		}
		if (!description) {
			res.status(400).send("description is required");
			return;
		}
		if (!is_completed) {
			res.status(400).send("is_completed is required");
			return;
		}
		const sql =
			"UPDATE todos SET title = $1, description = $2, is_completed = $3 WHERE id = $4 RETURNING *";
		const params = [title, description, is_completed, id];
		const result = await db.query(sql, params);
		if (result.rows.length == 0) {
			res.status(404).json(result.rows[0]);
			return;
		}
		res.status(200).json(result.rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal server error");
	}
});

module.exports = router;

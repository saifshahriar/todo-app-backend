const express = require("express");
const todoController = require("../controllers/todoController");

const router = express.Router();

router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: Returns a list of todos
 */
router.delete("/:id", todoController.deleteTodo);

module.exports = router;

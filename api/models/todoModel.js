const db = require("../../config/db");

async function getAllTodos() {
	return db.query("SELECT * FROM todos ORDER BY created_at DESC");
}

async function getTodoById(id) {
	return db.query("SELECT * FROM todos WHERE id = $1", [id]);
}

async function createTodo(title, description) {
	return db.query(
		"INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *",
		[title, description]
	);
}

async function updateTodo(id, title, description, is_completed) {
	return db.query(
		"UPDATE todos SET title = $1, description = $2, is_completed = $3 WHERE id = $4 RETURNING *",
		[title, description, is_completed, id]
	);
}

async function deleteTodo(id) {
	return db.query("DELETE FROM todos WHERE id = $1 RETURNING *", [id]);
}

module.exports = {
	getAllTodos,
	getTodoById,
	createTodo,
	updateTodo,
	deleteTodo,
};

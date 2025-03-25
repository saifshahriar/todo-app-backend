const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Todo API",
			version: "1.0.0",
			description: "API Documentation for the Todo App",
		},
		servers: [
			{
				url: "https://todo-app-backend-nine-jet.vercel.app/",
				description: "My API Documentation",
			},
		],
	},
	apis: ["server.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const swaggerMiddleware = (app) => {
	app.use(
		"/api/docs",
		swaggerUi.serve,
		swaggerUi.setup(swaggerDocs, {
			customCss:
				".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
			customCssUrl:
				"https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css",
		})
	);
};

module.exports = swaggerMiddleware;

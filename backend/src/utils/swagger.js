

import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "CRUDify Task API",
    version: "1.0.0",
    description: "API documentation for CRUDify task management app",
  },
  servers: [
    {
      url: "http://localhost:5000/api", // or your deployed URL
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Path to the API route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

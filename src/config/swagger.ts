import swaggerJSDoc from "swagger-jsdoc";

const options: any = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Management API",
      version: "1.0.0",
      description: "API documentation for the Student Management API project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/api/v1/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
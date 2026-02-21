import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

export const swaggerSetUp=(app:Application)=>{
    const options={
        definition:{
            openapi: "3.0.0",
      info: {
        title: "API Node JS + Express",
        version: "1.0.0",
        description: "Documentación de la API con Node JS y Express",
      },
      servers: [
        {
          url: process.env.URL_SWAGGER || "http://localhost:3000/api" ,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: [
      "./src/routes/*.ts",
      "./src/controllers/*.ts",
      "./dist/routes/*.js",
      "./dist/controllers/*.js",
    ]
  };

  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
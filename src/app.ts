import fastify from "fastify";
import router from "./router";
import { AppDataSource, createTables } from "./database";
import fastifyMysql from "@fastify/mysql";
import fastifyCors from "@fastify/cors";


AppDataSource.initialize()
  .then(async () => {
    console.log("TypeORM database successfully connected");
    await createTables();
  })
  .catch((error: any) => {
    console.error("Error connecting TypeORM database", error);
  });

const server = fastify({
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development"),
});

try {
  server.register(fastifyMysql, {
    connectionString: process.env.DB_CONNECTION_URL as string,
  });
} catch (err: any) {
  throw err;
}

server.register(fastifyCors, {
  origin: true, // Allowed origin (your localhost)
  methods: ["GET", "POST"], // Allowed HTTP methods
  allowedHeaders: ["Authorization", "Content-Type"], // Allowed headers in the request
  exposedHeaders: ["Custom-Header"], // Headers to expose in the response
  credentials: true, // Allow cookies and HTTP authentication headers
  maxAge: 86400,
});

server.register(router);

export default server;

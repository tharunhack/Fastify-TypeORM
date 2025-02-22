import app from "./app";
import { AppDataSource } from "./database";

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 8000;

AppDataSource.initialize()
  .then(async () => {
    // Start the Fastify server after the database connection is established
    app.listen({ port: FASTIFY_PORT, host: "0.0.0.0" }).finally(() => {
      app.log.info(`🚀  Fastify server running on port ${FASTIFY_PORT}`);
    });
  })
  .catch((error: any) => {
    app.log.error("Error connecting to database: " + error.message);
  });


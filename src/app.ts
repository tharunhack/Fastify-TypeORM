import fastify from "fastify";
import router from "./router";
import fastifyCors from "@fastify/cors";
import { AppDataSource, createTables } from "./database";
import fastifyPostgres from "@fastify/postgres";
import { buildSchema } from "type-graphql";
import { SwapTransactionsResolver } from "./controller/resolver";
import mercurius from "mercurius";


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
  server.register(fastifyPostgres, {
    connectionString: process.env.POSTGRESS_DB_CONNECTION_FOR_SWAP_TRANSACTIONS as string,
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

async function setupGraphQL() {
  const schema = await buildSchema({
    resolvers: [SwapTransactionsResolver], // Ensure correct resolver is passed
    validate: false, // Disable validation if needed
  });

  server.register(mercurius, {
    schema,
    graphiql: true, // Enable GraphQL Playground
  });
}

setupGraphQL(); // Ensure GraphQL is initialized

server.register(router);

export default server;

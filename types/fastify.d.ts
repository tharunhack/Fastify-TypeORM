import { MySQLPool } from "@fastify/mysql";

// if you only pass connectionString
declare module "fastify" {
  interface FastifyInstance {
    mysql: MySQLPool;
  }
}

import { FastifyInstance } from "fastify";
import healthCheck from "./controller/health";

export default async function router(fastify: FastifyInstance) {
  fastify.register(healthCheck, { prefix: "/healthCheck" });
}

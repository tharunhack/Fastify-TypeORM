import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import dotenv from "dotenv";

dotenv.config();

export default async function healthCheck(fastify: FastifyInstance) {
  fastify.get(
    "/",
    async function (_request: FastifyRequest, reply: FastifyReply) {
      try {
        reply.code(200).send({
          success: true,
          message: "Server is running...",
        });
      } catch (e: any) {
        reply.code(500).send({
          success: false,
          message: "Not Found...",
          error: e,
        });
      }
    }
  );
}

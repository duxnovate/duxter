import type { FastifyInstance } from "fastify";
import { helloworld } from "@routes/index.js";

const registerRoutes = (fastify: FastifyInstance) => {
  fastify.register(helloworld);
};

export default registerRoutes;

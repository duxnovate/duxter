import type { FastifyInstance } from "fastify";

export const helloworld = async (fastify: FastifyInstance) => {
  fastify.get("/", async () => {
    return { message: "Hello, World!" };
  });
};

export const secondRoute = async (fastify: FastifyInstance) => {
  fastify.get("/second", async () => {
    return { message: "This is the second route!" };
  });
};

// Function to register routes
export default async function registerRoutes(fastify: FastifyInstance) {
  // Register both routes
  await fastify.register(helloworld);
  await fastify.register(secondRoute);
}

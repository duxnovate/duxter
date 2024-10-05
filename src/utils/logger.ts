import Fastify from "fastify";

const isDevelopment = process.env.NODE_ENV !== "production";
const loggerConfig = isDevelopment
  ? {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname,remoteAddress,remotePort,reqId,responseTime",
          messageFormat: "{method}{statusCode} in {responseTime}ms",
          singleLine: true,
        },
      },
    }
  : {
      level: "info",
    };

const fastify = Fastify({
  logger: loggerConfig,
});

export default fastify;

import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "jobslink",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "paras03",
      port: Number(process.env.DB_PORT) || 5432,
    },
    migrations: {
      directory: "./src/migrations",
    },
  },
};

export default config;

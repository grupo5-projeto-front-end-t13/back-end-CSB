import 'dotenv/config'
import 'reflect-metadata';
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const port = process.env.PGPORT as number | undefined;

const setDataSourceOptions = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
  const migrationsPath: string = path.join(__dirname, "./migrations/**.{js,ts}")
  
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [entitiesPath],
      migrations: [migrationsPath],
    };
  }
  
  if(nodeEnv === "test"){
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath]
    }
  }
  
  return {
    type: "postgres",
    host: process.env.PGHOST,
    port: port,
    username: process.env.PGUSER,
    password: String(process.env.PGPASSWORD),
    database: process.env.PGDATABASE,
    logging: true,
    synchronize: true,
    entities: [entitiesPath],
    migrations: [migrationsPath]
  }
}
  
  const dataSourceOptions = setDataSourceOptions();
  export const AppDataSource = new DataSource(dataSourceOptions);
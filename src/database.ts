import { DataSource, EntityManager } from "typeorm";
import { TestDB } from "./controller/entities/testDB";
import { TEST_DB, TestDBTableQuery } from "./constants";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URL = process.env.DB_CONNECTION_URL;
export const AppDataSource = new DataSource({
  type: "mysql",
  url: DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [TestDB],
});

export const createTables = async () => {
  try {
    await createTableIfNotExists(
      AppDataSource.manager,
      TEST_DB,
      TestDBTableQuery
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export const createTableIfNotExists = async (
  connection: EntityManager,
  tableName: string,
  query: string
) => {
  try {
    const tableExist = await connection.query(
      `SHOW TABLES LIKE '${tableName}'`
    );
    if (tableExist.length === 0) {
      await connection.query(query);
      console.log(`Table ${tableName} created successfully`);
    } else {
      console.log(`Table ${tableName} already exists, skipping creation.`);
    }
  } catch (error) {
    console.log("error: ", error);
    console.error(`Error creating table ${tableName}:`, error);
    throw new Error("Internal server error");
  }
};
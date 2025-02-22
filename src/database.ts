import { DataSource, EntityManager } from "typeorm";
import dotenv from "dotenv";
import { SwapTransactionsInPostgres } from "./controller/entities/swapTransactionsInPostgres";
import { SWAP_TRANSACTIONS_IN_POSTGRES, SwapTransactionsInPostgresDataTableQuery } from "./constants";
dotenv.config();

const DATABASE_URL = process.env.POSTGRESS_DB_CONNECTION_FOR_SWAP_TRANSACTIONS;
export const AppDataSource = new DataSource({
  type: "postgres",
  url: DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [SwapTransactionsInPostgres],
});

export const createTables = async () => {
  try {
    await createTableIfNotExists(
      AppDataSource.manager,
      SWAP_TRANSACTIONS_IN_POSTGRES,
      SwapTransactionsInPostgresDataTableQuery
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
      `SELECT to_regclass('${tableName}')`
    );

    if (!tableExist[0].to_regclass) {
      await connection.query(query);
      console.log(`Table ${tableName} created successfully`);
    } else {
      console.log(`Table ${tableName} already exists, skipping creation.`);
    }
  } catch (error) {
    console.error(`Error creating table ${tableName}:`, error);
    throw new Error("Internal server error");
  }
};
import { Resolver, Query, Arg, Int, Float } from "type-graphql";
import { SwapTransactionsInPostgres } from "./entities/swapTransactionsInPostgres";
import { AppDataSource } from "../database";

@Resolver(SwapTransactionsInPostgres)
export class SwapTransactionsResolver {
  private userRepository = AppDataSource.getRepository(
    SwapTransactionsInPostgres
  );

  // ✅ Get transactions for a specific wallet address
  @Query(() => [SwapTransactionsInPostgres])
  async getTransactionsByLimit(
    @Arg("wallet_address", { nullable: true }) wallet_address?: string,
    @Arg("limit", () => Int, { nullable: true }) limit?: number,
    @Arg("order", () => String, { nullable: true, defaultValue: "ASC" })
    order?: "ASC" | "DESC"
  ): Promise<SwapTransactionsInPostgres[]> {
    const whereCondition = wallet_address ? { wallet_address } : {};

    return this.userRepository.find({
      where: whereCondition,
      take: limit,
      order: { transaction_hash: order }, // Order by transaction_hash (ASC or DESC)
    });
  }

  // ✅ Get total number of transactions for a specific wallet OR overall
  @Query(() => Int)
  async getTotalTransactions(
    @Arg("wallet_address", { nullable: true }) wallet_address?: string
  ): Promise<number> {
    const query = this.userRepository
      .createQueryBuilder("transaction")
      .select("COUNT(*)", "count");

    if (wallet_address) {
      query.where("transaction.wallet_address = :wallet_address", {
        wallet_address,
      });
    }

    const result = await query.getRawOne();
    return parseInt(result?.count || "0");
  }

  // ✅ Get total volume using from_token_in_usd (for a specific wallet OR overall wallets)
  @Query(() => Float)
  async getTotalVolumeInUsd(
    @Arg("wallet_address", { nullable: true }) wallet_address?: string
  ): Promise<number> {
    const query = this.userRepository
      .createQueryBuilder("transaction")
      .select("SUM(transaction.from_token_in_usd)", "totalVolume");

    if (wallet_address) {
      query.where("transaction.wallet_address = :wallet_address", {
        wallet_address,
      });
    }

    const result = await query.getRawOne();
    return parseFloat(result?.totalVolume || "0");
  }

  // ✅ Get total volume using from_token_in_usd (for a specific wallet OR overall wallets)
  @Query(() => Float)
  async getTotalVolume(
    @Arg("wallet_address", { nullable: true }) wallet_address?: string
  ): Promise<number> {
    const query = this.userRepository
      .createQueryBuilder("transaction")
      .select("SUM(transaction.from_token_amount)", "totalVolume");

    if (wallet_address) {
      query.where("transaction.wallet_address = :wallet_address", {
        wallet_address,
      });
    }

    const result = await query.getRawOne();
    return parseFloat(result?.totalVolume || "0");
  }

  // ✅ Get total volume of tokens swapped for a specific wallet OR overall wallets
  @Query(() => Float)
  async getTotalVolumeByToken(
    @Arg("token_amount", () => String)
    token_amount:
      | "from_token_amount"
      | "to_token_amount"
      | "from_token_in_usd"
      | "to_token_in_usd",
    @Arg("wallet_address", { nullable: true }) wallet_address?: string,
    @Arg("from_token_address", { nullable: true }) from_token_address?: string,
    @Arg("to_token_address", { nullable: true }) to_token_address?: string,
    @Arg("start_date", { nullable: true }) start_date?: string,
    @Arg("end_date", { nullable: true }) end_date?: string
  ): Promise<number> {
    if (
      ![
        "from_token_amount",
        "to_token_amount",
        "from_token_in_usd",
        "to_token_in_usd",
      ].includes(token_amount)
    ) {
      throw new Error("Invalid token amount type");
    }

    const query = this.userRepository
      .createQueryBuilder("transaction")
      .select(`SUM(transaction.${token_amount})`, "totalVolume");

    if (wallet_address) {
      query.andWhere("transaction.wallet_address = :wallet_address", {
        wallet_address,
      });
    }
    if (from_token_address) {
      query.andWhere("transaction.from_token_address = :from_token_address", {
        from_token_address,
      });
    }
    if (to_token_address) {
      query.andWhere("transaction.to_token_address = :to_token_address", {
        to_token_address,
      });
    }
    const startDateValue = start_date ? new Date(start_date) : null;
    const endDateValue = end_date ? new Date(end_date) : null;

    if (startDateValue) {
      query.andWhere(
        "(CAST(transaction.transaction_time AS BIGINT) / 1000000) >= :start_date",
        { start_date: Math.floor(startDateValue.getTime() / 1000) }
      );
    }

    if (endDateValue) {
      query.andWhere(
        "(CAST(transaction.transaction_time AS BIGINT) / 1000000) <= :end_date",
        { end_date: Math.floor(endDateValue.getTime() / 1000) }
      );
    }

    const result = await query.getRawOne();
    return parseFloat(result?.totalVolume || "0");
  }
}

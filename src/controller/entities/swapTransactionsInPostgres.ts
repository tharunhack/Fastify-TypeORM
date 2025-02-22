import { Column, Entity, Index, PrimaryColumn } from "typeorm";
import { SWAP_TRANSACTIONS_IN_POSTGRES } from "../../constants";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity(SWAP_TRANSACTIONS_IN_POSTGRES)
@Index("IDX_transaction_hash", ["transaction_hash"])
@Index("IDX_wallet_address", ["wallet_address"])
export class SwapTransactionsInPostgres {
  @Field()
  @PrimaryColumn({ type: "varchar" })
  transaction_hash!: string;

  @Field()
  @Column({ type: "varchar", nullable: false })
  transaction_time!: string;

  @Field()
  @Column({ type: "varchar", nullable: false })
  wallet_address!: string;
  
  @Field()
  @Column({ type: "varchar", nullable: false })
  from_chain!: string;
  
  @Field()
  @Column({ type: "varchar", nullable: false })
  to_chain!: string;

  @Field()
  @Column({ type: "varchar", nullable: false })
  bridge_name!: string;

  @Field()
  @Column({ type: "varchar", nullable: false })
  from_token_address!: string;

  @Field()
  @Column({ type: "varchar", nullable: false })
  to_token_address!: string;

  @Field()
  @Column({ type: "float", nullable: false })
  from_token_amount!: number;

  @Field()
  @Column({ type: "float", nullable: false })
  from_token_in_usd!: number;

  @Field()
  @Column({ type: "float", nullable: false })
  to_token_amount!: number;

  @Field()
  @Column({ type: "float", nullable: false })
  to_token_in_usd!: number;

  @Field()
  @Column({ type: "timestamp", default: () => "NOW()" })
  created_at!: Date;
}

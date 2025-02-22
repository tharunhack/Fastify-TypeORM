export function dateToMicroseconds(dateString: any) {
  const date = new Date(dateString);
  return date.getTime() * 1000 // Convert milliseconds to microseconds
}
export const SWAP_TRANSACTIONS_IN_POSTGRES = `swap_transactions`;
export const SwapTransactionsInPostgresDataTableQuery = `CREATE TABLE IF NOT EXISTS ${SWAP_TRANSACTIONS_IN_POSTGRES} (
  transaction_hash VARCHAR PRIMARY KEY,
  transaction_time VARCHAR,
  wallet_address VARCHAR,
  from_chain VARCHAR,
  to_chain VARCHAR,
  bridge_name VARCHAR,
  from_token_address VARCHAR,
  to_token_address VARCHAR,
  from_token_amount FLOAT,
  from_token_in_usd FLOAT,
  to_token_amount FLOAT,
  to_token_in_usd FLOAT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
)`;


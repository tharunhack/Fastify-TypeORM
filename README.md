# GraphQL Swap Transactions
# Installation & Setup

```bash
$ git clone https://github.com/tharunhack/Fastify-TypeORM.git
$ cd graphql-swaptransactions
$ npm run install
```

## Set up environment variables:

Create a .env file and configure the database connection.

```
DATABASE_URL=postgresql://user:password@localhost:5432/swap_transactions
```

## Start the server

```
npm run watch  //separate terminal

npm run dev   // separate terminal
```

## API Endpoints

### 1. Get Transactions by Limit

Query: getTransactionsByLimit

```
query {
  getTransactionsByLimit(wallet_address: "0x1", limit: 10, order: "DESC") {
    id
    wallet_address
    transaction_hash
    from_token_amount
    to_token_amount
  }
}
```

### Parameters:

- wallet_address (optional): Filter by wallet address.

- limit (optional): Limit the number of transactions returned.

- order (optional): Sort order (ASC or DESC based on transaction_hash).

### 2. Get Total Transactions Count

Query: getTotalTransactions

```
query {
  getTotalTransactions(wallet_address: "0x1")
}
```

### Parameters:

- wallet_address (optional): Count transactions for a specific wallet. If omitted, counts all transactions.

### 3. Get Total Volume in USD

Query: getTotalVolumeInUsd

```
query {
  getTotalVolumeInUsd(wallet_address: "0x1")
}
```

### Parameters:

- wallet_address (optional): Fetch total volume for a specific wallet.

### 4. Get Total Volume

Query: getTotalVolume

```
query {
  getTotalVolume(wallet_address: "0x1")
}
```

### Parameters:

- wallet_address (optional): Fetch total volume for a specific wallet.

### 5.  Get Total Volume by Token Type

Query: getTotalVolumeByToken

```
query {
  getTotalVolumeByToken(
    token_amount: "from_token_in_usd"
    wallet_address: "0x1234abcd"
    from_token_address: "0xtoken1"
    to_token_address: "0xtoken2"
    start_date: "2024-01-01"
    end_date: "2024-07-31"
  )
}
```

### Parameters:

- token_amount (required): Type of token amount (from_token_amount, to_token_amount, from_token_in_usd, to_token_in_usd).

- wallet_address (optional): Filter by wallet address.

- from_token_address (optional): Filter by source token.

- to_token_address (optional): Filter by destination token.

- start_date (optional): Start date for filtering transactions.

- end_date (optional): End date for filtering transactions.


## Running Queries in Thunder Client (or Postman)

1. Open Thunder Client

2. Create a new GraphQL request

3. Set the endpoint: http://localhost:8000/graphql

4. Paste the desired GraphQL query

5. Click Send

## Notes

- Ensure the PostgreSQL database is running.

- Dates should be formatted as YYYY-MM-DD.

- Sorting supports ASC and DESC for transaction ordering.

## License
MIT License

## Author
tharunhack
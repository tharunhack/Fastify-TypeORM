export const TEST_DB = `TEST_DB`;

export const TestDBTableQuery = `
  CREATE TABLE IF NOT EXISTS ${TEST_DB} (
    id INT AUTO_INCREMENT PRIMARY KEY
  );
`;
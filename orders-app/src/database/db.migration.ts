import { getConnection } from 'typeorm';

export const getDbConnection = async (connectionName = 'default') => {
  return getConnection(connectionName);
};

export const runDbMigrations = async (connectionName = 'default') => {
  const conn = await getDbConnection(connectionName);
  await conn.runMigrations();
};

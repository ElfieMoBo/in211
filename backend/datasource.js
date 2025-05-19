import { DataSource } from 'typeorm';

const config = {
  type: 'postgres',
  synchronize: false,
  entities: ['entities/*.js'],
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export const appDataSource = new DataSource(
  process.env.NODE_ENV === 'development'
    ? {
        ...config,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
      }
    : {
        ...config,
        host: process.env.DATABASE_PGHOST,
        port: 5432,
        username: process.env.DATABASE_PGUSER,
        password: process.env.DATABASE_PGPASSWORD,
        database: process.env.DATABASE_PGDATABASE,
      },
);
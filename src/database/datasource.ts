import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 44321,
  username: 'postgres',
  password: 'pwd',
  database: 'tour_db',
  entities: ['src/entities//*.ts'],
  migrations: ['src/migrations/*{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
});

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'tcc_db',
  synchronize: false,
  entities: ['src/modules/**/typeorm/entities/*.entity.ts'],
  migrations: ['src/shared/database/migrations/*.ts'],
});

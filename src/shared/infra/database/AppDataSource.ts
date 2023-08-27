import { DataSource } from 'typeorm';

import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRESS_HOST,
  port: 5432,
  username: process.env.POSTGRESS_USER,
  password: process.env.POSTGRESS_PASSWORD,
  database: process.env.POSTGRESS_DB,
  synchronize: false,
  entities: ['src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['src/shared/infra/database/migrations/*.ts'],
});

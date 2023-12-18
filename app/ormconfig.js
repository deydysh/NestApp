require('dotenv').config();

// Ваш конфиг для TypeORM
module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost', // Подставляем значения из .env или используем значение по умолчанию
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
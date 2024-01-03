// ormconfig.js
module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nest',
  password: 'nest',
  database: 'jstudio_users',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // In development, set to true; in production, set to false
};
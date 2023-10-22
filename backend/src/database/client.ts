import knex from 'knex';

const knexOptions = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

export default class dbClient {
  static knex = knex(knexOptions);

  static runRawQuery(query: string, params: any = null) {
    return new Promise((resolve, reject) => {
      dbClient.knex
        .raw(query, params)
        .then(queryResponse => resolve(queryResponse.rows))
        .catch(reject);
    });
  }
}

import 'dotenv/config';
console.log(process.env.DB_NAME);
export default {
  test: process.env.DB_NAME,
};

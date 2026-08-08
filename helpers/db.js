const { Client } = require("pg");
const client = new Client({
    host : 'localhost',
    user : 'postgres',
    port : 5434,
    password : "Ordean.Adrian291203",
    database : 'Presidential_Elections'
  });
client.connect();

async function addANewUser(firstName, lastName, email, password, phoneNumber, birthdate, description) {
    await client.query(`INSERT INTO public."Users" (first_name, last_name, email, password, phone_number, birth_date, description) VALUES ('${firstName}', '${lastName}', '${email}', '${password}', '${phoneNumber}', '${birthdate}', '${description}');`);
}

async function getUserByEmail(email) {
  try {
    const user = await client.query(`SELECT * from public."Users" WHERE email = '${email}'`);
    return user.rows[0];
  } catch {

  }
}

async function changePassword(email, password) {
  try {
    await client.query(`UPDATE public."Users" SET password = '${password}' WHERE email = '${email}'`)
  } catch {

  }
}
module.exports = { client, addANewUser, getUserByEmail, changePassword };
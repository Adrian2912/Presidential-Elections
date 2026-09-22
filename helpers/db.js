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
    const user = await client.query(`SELECT * from public."Users" WHERE email = '${email}';`);
    return user.rows[0];
  } catch (err) {
    console.err(err);
  }
}

async function changePassword(email, password) {
  try {
    await client.query(`UPDATE public."Users" SET password = '${password}' WHERE email = '${email}';`)
  } catch (err) {
    console.err(err);
  }
}

async function changeData(email, firstName, lastName, phoneNumber, birthDate, description) {
  try {
    await client.query(`UPDATE public."Users" SET first_name = '${firstName}', last_name = '${lastName}', phone_number = '${phoneNumber}', birth_date = '${birthDate}', description = '${description}' WHERE email = '${email}';`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { client, addANewUser, getUserByEmail, changePassword, changeData };
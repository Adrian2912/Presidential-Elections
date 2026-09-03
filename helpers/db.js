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
  } catch {

  }
}

async function changePassword(email, password) {
  try {
    await client.query(`UPDATE public."Users" SET password = '${password}' WHERE email = '${email}';`)
  } catch {

  }
}

async function changeData(email, firstName, lastName, phoneNumber, birthDate, description) {
  try {
    await client.query(`UPDATE public."Users" SET first_name = '${firstName}', last_name = '${lastName}', phone_number = '${phoneNumber}', birth_date = '${birthDate}', description = '${description}' WHERE email = '${email}';`);
  } catch (err) {
    console.error(err);
  }
}

async function addANewCandidate(candidateID) {
  try {
    await client.query(`INSERT INTO public."candidates" (id) VALUES (${candidateID});`);
  } catch (err) {
    console.error(err);
  }
}

async function getAllCandidates() {
  try {
    const candidatesList = await client.query(`SELECT candidates.id, first_name, last_name, number_of_votes FROM  public."candidates" INNER JOIN public."Users" on public."candidates".id = public."Users".id ORDER BY number_of_votes DESC;`);
    return candidatesList.rows;
  } catch (err) {
    console.error(err);
  }
}

async function getCandidateEmail(userEmail) {
  try {
    const candidateEmail = await client.query(`SELECT email FROM public."candidates" INNER JOIN public."Users" on public."candidates".id = public."Users".id where email = '${userEmail}';`);
    return candidateEmail.rows;
  }catch (err) {
    console.error(err);
  }
}

async function removeCandidate(candidateId) {
  try {
    await client.query(`UPDATE public."Users" SET has_voted = false FROM public."votes" WHERE public."Users".id = public."votes".user_id AND candidate_id = ${candidateId}`);
    await client.query(`DELETE FROM public."votes" WHERE candidate_id = ${candidateId}`)
    await client.query(`DELETE FROM public."candidates" WHERE id = '${candidateId}'`);
  } catch (err) {
    console.error(err);
  }
}

async function addVote(userId, candidateId) {
  try {
    await client.query(`INSERT INTO public."votes" (user_id, candidate_id) VALUES (${userId}, ${candidateId})`)
    await client.query(`UPDATE public."Users" SET has_voted = true WHERE id = ${userId}`);
    await client.query(`UPDATE public."candidates" SET number_of_votes = (SELECT number_of_votes FROM public."candidates" WHERE id = ${candidateId}) + 1 WHERE id = ${candidateId};`)
  } catch (err) {
    console.error(err);
  }
}

async function cancelVote(userId) {
  try {
    await client.query(`UPDATE public."candidates" SET number_of_votes = (SELECT number_of_votes FROM public."candidates" WHERE id = (SELECT candidate_id FROM public."votes" WHERE user_id = ${userId})) - 1 WHERE id = (SELECT candidate_id FROM public."votes" WHERE user_id = ${userId});`);
    await client.query(`DELETE FROM public."votes" WHERE user_id = '${userId}'`);
    await client.query(`UPDATE public."Users" SET has_voted = false WHERE id = ${userId};`);
  } catch(err) {
    console.error(err);
  }
}

module.exports = { client, addANewUser, getUserByEmail, changePassword, changeData, addANewCandidate, getAllCandidates, getCandidateEmail, removeCandidate, addVote, cancelVote };
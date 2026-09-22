const { Client } = require("pg");
const client = new Client({
    host : 'localhost',
    user : 'postgres',
    port : 5434,
    password : "Ordean.Adrian291203",
    database : 'Presidential_Elections'
  });
client.connect();

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

module.exports = {addANewCandidate, getAllCandidates, getCandidateEmail, removeCandidate };


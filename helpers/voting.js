const { Client } = require("pg");
const client = new Client({
    host : 'localhost',
    user : 'postgres',
    port : 5434,
    password : "Ordean.Adrian291203",
    database : 'Presidential_Elections'
  });
client.connect();

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

module.exports = { addVote, cancelVote } ;
const { Client } = require("pg");
const client = new Client({
    host : 'localhost',
    user : 'postgres',
    port : 5434,
    password : "Ordean.Adrian291203",
    database : 'Presidential_Elections'
  });
client.connect();

async function getWinnerCandidateData() {
    try {
        const winnerCandidate = await client.query('SELECT first_name, last_name, number_of_votes FROM  public."candidates" INNER JOIN public."Users" on public."candidates".id = public."Users".id ORDER BY number_of_votes DESC LIMIT 1');
        return winnerCandidate.rows[0];
    } catch (err) {
        console.error(err);
    }
}


async function finishElectionsRound() {
  try {
    const winner = await getWinnerCandidateData();
    await client.query(`INSERT INTO public."presidentialrounds"(winner, number_of_votes) VALUES ('${winner.first_name + ' ' + winner.last_name}', ${winner.number_of_votes});`);
    await client.query('DELETE FROM public."votes";');
    await client.query('DELETE FROM public."candidates";');
    await client.query('UPDATE public."Users" SET has_voted = false;');
  } catch(err) {
    console.error(err);
  }
}

async function getAllPresidentialElections() {
  try {
    const allPresidentialElections = await client.query('SELECT * FROM public."presidentialrounds";');
    return allPresidentialElections.rows;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getWinnerCandidateData, finishElectionsRound, getAllPresidentialElections };
import axios from "axios";
import clientPromise from '../../lib/mongodb';

async function getQuestions(topic) {
  const llm = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
    "messages": [
      {
        "role": "system",
        "content": process.env.SYSTEM_PROMPT
      },
      {
        "role": "user",
        "content": topic
      }
    ],
    "model": "llama-3.3-70b-versatile",
    "temperature": 1,
    "max_tokens": 8120,
    "top_p": 1,
    "stream": false
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.GROQ_TOKEN
    }
  });
  return await JSON.parse(llm['data']['choices'][0]['message']['content']);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const client = await clientPromise;
  const db = client.db('dvidpilabs-learn');
  const code = Math.floor(100000 + Math.random() * 900000);
  //const questions = await getQuestions();

  const game = {
    state: 1,
    code,
    players: [],
    lead: [],
    cards: [
      {
        "question": "What is the capital of France?",
        "answers": [
          "Paris",
          "London",
          "Berlin",
          "Rome"
        ],
        "correct": "Paris"
      },
      {
        "question": "What is the capital of Italy?",
        "answers": [
          "Paris",
          "London",
          "Berlin",
          "Rome"
        ],
        "correct": "Rome"
      },
      {
        "question": "What is the capital of Germany?",
        "answers": [
          "Paris",
          "London",
          "Berlin",
          "Rome"
        ],
        "correct": "Berlin"
      }
    ],
    endsAt: new Date(Date.now() + 30 * 60 * 1000),
  };

  await db.collection('games').insertOne(game);
  setTimeout(async () => {
    await db.collection('games').deleteOne({ code });
  }, 60 * 60 * 1000);

  res.status(200).json({ code });
}
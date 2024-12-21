import axios from "axios";
import {connectToDatabase} from "@/lib/mongodb";

export let lobbies = {};

async function getQuestions(topic) {
  const llm = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
    "messages": [
      {
        "role": "system",
        "content": ""
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
  if (req.method === 'POST') {
    try {
      const json = req.body;
      //const q = await getQuestions(json["topic"]);
      const q = [
        {
          "question": "What is the capital of France?",
          "answers": [
            "Paris",
            "London",
            "Berlin",
            "Rome"
          ],
          "correct": "Paris"
        }
      ]
      const nickname = json["name"] || 'Player' + Math.floor(Math.random() * 100);
      const lobbyCode = Math.floor(100000 + Math.random() * 900000);
      const endsAt = Date.now() + 30 * 60 * 1000;

      const { db } = await connectToDatabase();

      await db.collection('lobbies').insertOne({
        state: 1,
        code: lobbyCode,
        players: [
          {
            id: 0,
            name: nickname,
            score: 0,
            icon: null,
            gamePoints: null,
            answers: { correct: 0, total: 0 },
          },
        ],
        lead: [0],
        cards: q,
        endsAt,
      });

      res.status(200).json({ code: lobbyCode });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

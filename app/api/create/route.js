import axios from "axios";

let lobbies = {};

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
  return await llm['data']['choices'][0]['message']['content'];
}

export async function POST(request) {
  try {
    const json = await request.json();
    //const q = await getQuestions(json["topic"]);
    const nickname = json["name"] || 'Player' + Math.floor(Math.random() * 100);
    const lobbyCode = Math.floor(100000 + Math.random() * 900000);
    const endsAt = Date.now() + 30 * 60 * 1000;

    lobbies[lobbyCode] = {
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
      cards: [],
      endsAt,
    };

    return new Response(JSON.stringify({ code: lobbyCode }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

import axios from "axios";

export async function POST(request) {
  try {
    const json = await request.json();
    const topic = json["topic"];
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
    const questions = await llm['data']['choices'][0]['message']['content'];
    console.log(questions)
    return new Response(JSON.stringify({ message: 'Data received' }), {
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

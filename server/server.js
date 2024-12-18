const express = require("express");
const app = express();
const axios = require("axios");

const key = ""

app.post("/learn", async (req,res) => {
  try {
    const topic = req.body.topic;
    const data = axios.post("https://api.groq.com/openai/v1/chat/completions", {
      "messages": [
        {
          "role": "system",
          "content": "You are a deeply integrated AI used in an embedded application. Your main purpose is to create Kahoot-like courses on various topics. For every request, the user prompt will look like contain what the user requested. \n\nReply with only a JSON array with each item structured like this:\n{\n    \"question\": \"Question\",\n    \"answer\": [\n      String, String, String, String // each string is one answer, keep the answers short\n    ],\n    \"correct\": \"The correct answer\" // make sure this is also a part of the answer array\n}\n\nRules:\n1. Follow the above instructions to the best of your abilities.\n2. Keep the questions and answers PG-friendly - thus, use no swear words.\n3. Reply with ONLY the entire JSON array and no additional text.\n4. Ensure there'\''s at least ONE correct answer.\n5. Vary the kinds of questions you ask unless the user specifically requests a kind of questions.\n6. Always generate 50 questions."
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
      "stream": false,
      "response_format": {
        "type": "json_object"
      },
      "stop": null
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key
      }
    });
    const questions = await data['data'];
    res.status(200).json({

    })

  } catch(err) {
    console.error(err);
  }
})

app.listen(3001);


const llm = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
  "messages": [
    {
      "role": "system",
      "content": "You are a deeply integrated AI used in an embedded application. Your main purpose is to create Kahoot-like courses on various topics. For every request, the user prompt will look like contain what the user requested. \n\nReply with only a JSON array with each item structured like this:\n{\n    \"question\": \"Question\",\n    \"answer\": [\n      String, String, String, String // each string is one answer, keep the answers short\n    ],\n    \"correct\": \"The correct answer\" // make sure this is also a part of the answer array\n}\n\nRules:\n1. Follow the above instructions to the best of your abilities.\n2. Keep the questions and answers PG-friendly - thus, use no swear words.\n3. Reply with ONLY the entire JSON array and no additional text.\n4. Ensure there'\''s at least ONE correct answer.\n5. Vary the kinds of questions you ask unless the user specifically requests a kind of questions.\n6. Always generate 50 questions."
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
  "stream": false,
  "response_format": {
    "type": "json_object"
  },
  "stop": null
}, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  }
});
const questions = await data['data'];
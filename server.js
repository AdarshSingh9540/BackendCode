const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());


app.post('/api', async (req, res) => {
  try {
    const message = req.body.message;

    const prompt = `I am giving you some ideas and you have to find out some keywords from the ideas around 10 to 20  keywords fromm the idea and give me 3 to 4  synonyms  of each keywords: ${message}`;

 
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.choices && response.data.choices[0].message) {
      res.send(response.data.choices[0].message.content);
    } else {
      res.status(500).send('Failed to generate response!');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});


app.listen(port, () => {
  console.log(`Server running on  http://localhost:${port}`);
});

const{ Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();


const port = process.env.API_PORT

const token = process.env.OPENAI_API_KEY
const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post('/message', (req, res)=> {
  const response = openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.prompt,
    temperature: 0,
    top_p: 1,
    frequency_penalty:0,
    presence_penalty: 0,
    max_tokens: 1024,
  })
  
  response.then((data)=> {
    res.send({message: data.data.choices[0].text});
  });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

// Export the Express API
module.exports = app;





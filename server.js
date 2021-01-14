const express = require('express');
const request = require('request');

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3001;

router.get('/', (req, res) => {
  res.send({
    server: {
      name: 'Pokemon API Server',
    },
    availableData: {
      allpokemon: {
        name: 'Gen 1-7',
        description: 'Get all Pokemon from Generation 1 - 7'
      },
      spepokemon: {
        name: 'Specific Pokemon',
        description: 'Get the in the link specified Pokemon from the API',
      },
    },
  });
});


router.get('/allpokemon', (req, res) => {
  request('https://pokeapi.co/api/v2/pokemon/?limit=809', (err, response, body) => {
    if (err || !body) {
      res.send('An error has occurred during the process. Please try again later');
    };
    let results = JSON.parse(body);
    res.send({
      body: results
    })
  });
});

router.get('/spepokemon/:pokename', (req, res) => {
  request(`https://pokeapi.co/api/v2/pokemon/${req.params.pokename}`, (err, response, body) => {
    if (err || !body) {
      res.send('An error has occurred during the process. Please try again later');
    };
    let results = JSON.parse(body);
    res.send({
      body: results.body
    });
  });
});

router.get('/favorites/:phoneid', (req, res) => {
  request(`https://pokeapi.co/api/v2/pokemon/${req.params.pokename}`, (err, response, body) => {
    if (err || !body) {
      res.send('An error has occurred during the process. Please try again later');
    };
    let results = JSON.parse(body);
    res.send({
      body: results.body
    });
  });
});

app.use('/', router);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

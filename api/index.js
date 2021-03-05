var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var jsonParser = bodyParser.json()
const fetch = require("node-fetch");
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); 

//ruta para buscar producto
app.post('/buscador', jsonParser, function (req, res) {
  let {search} = req.body
  fetch('https://api.mercadolibre.com/sites/MLA/search?q='+search.replace('/ /g', '+'))
  .then(respuesta => respuesta.json())
  .then(json => {
    res.status(200).send(json)  
  })
  .catch((err) => {
    console.error('Error', err);
  });
});

app.get("buscar/:id", function(req, res){
  let id = req.params
})

//ruta que solo muestra un producto especifico, "ver mas"
app.post('/traerproducto', jsonParser, function (req, res) {
  let {search} = req.body
  fetch('https://api.mercadolibre.com/items/'+search+'?include_attributes=all')
  .then(respuesta => respuesta.json())
  .then(json => {
    res.status(200).send(json)  
  })
  .catch((err) => {
    console.error('Error', err);
  });
});

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


app.listen(8080, function () {
  console.log('Example app listening on port 3001!');
});



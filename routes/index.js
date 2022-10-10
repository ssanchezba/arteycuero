var express = require('express');
var router = express.Router();

const send = require('gmail-send')({
  user: 'arteycuero.sergio@gmail.com',
  pass: 'itphbdjqqibmrmkx',
  to: ['ssanchezba02@gmail.com'],
  subject: 'arteycuero.info'
});

var enviar = function (newOptions, callback) {
  var options = {
  };
  if (newOptions) {
    options.text = newOptions.text || null;
    options.html = newOptions.html || null;
  }

  send(options, function (err, response) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log(response);
      callback(null, response);
    }
  });
};

/* GET home page. */
router.post('/formulario', function(req, res, next) {
  var body = `
  <h1>INFORMACION SOLICITADA</h1>
  <div>
    <span> Nombre: ${req.body.nombre || "?"} </span>
    <br>
    <span> Apellidos: ${req.body.apellidos || "?"} </span>
    <br>
    <span> Correo: ${req.body.email || "?"} </span>
    <br>
    <span> Telefono: ${req.body.phone || "?"} </span>
    <br>
    <span> Mensaje: ${req.body.message || "?"} </span>
  </div>
  `;
  enviar(
    {
      html: body
    },
    function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.redirect('/gracias.html');
      }
    }
  );
});

module.exports = router;

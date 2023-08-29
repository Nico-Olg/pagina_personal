const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configura la API key de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send-email', (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  const msg = {
    to: 'tuemail@example.com',
    from: email,
    subject: asunto,
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send('Email enviado con éxito');
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send('Error al enviar el email');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

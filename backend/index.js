const connectToMongo = require('./db');
const express = require('express');
const cors = require("cors");
const { query, matchedData, validationResult, body } = require('express-validator');
const nodemailer  = require("nodemailer");

connectToMongo();

const app = express()
const port = 5000

// to use request body
app.use(express.json());
app.use(cors());

// **** Sample (a endpoint in our application can be handled like below line... but this is not preferred in case of a large application) ****
// app.get('/', (req, res) => {
//   res.send('Hello Vivek!')
// })

// **** Alternate/Better solution ****
// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.post("/sendmail",[body('email', 'Enter a valid email').isEmail(),] , async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({success: false, errors: errors.array()});
  }

  console.log(req.body);
  const {email, message} = req.body;

  try {
    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '<your-mail-id>',
        pass: '<your-password>'
      }
    });
    
    const mailDetails = {
      from: '<your-mail-id>',
      to: email,
      subject: "Confirmation mail for iNotes services",
      text: message
    };

    mailTransporter.sendMail(mailDetails, (err, data) => {
      if(err) return res.status(500).json({success: false, error: err});
      else {
        return res.status(200).json({success: true})
      }
    });
  } catch (error) {
    return res.status(500).json({success: false, error: error});
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
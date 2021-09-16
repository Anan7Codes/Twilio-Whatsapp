// external packages
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Start the app
const app = express();

// app settings
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Server Port
const PORT = process.env.PORT;

const WA = require('./helper-function/whatsapp-send-message');

// Route for WhatsApp
app.post('/whatsapp', async (req, res) => {

    console.log(req.body)
    let message = req.body.Body;
    let senderID = req.body.From;
    console.log(message);
    console.log(senderID);

    if(req.body.Latitude || req.body.Longitude) {
        return await WA.sendMessage(`You've sent me a location from ${senderID} with the lat and long as ${req.body.Latitude} * ${req.body.Longitude}`, senderID);
    }

    // Write a function to send message back to WhatsApp
    await WA.sendMessage(`You've sent me a text message from ${senderID} with the message ${message}`, senderID);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});


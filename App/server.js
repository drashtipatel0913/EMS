require('dotenv').config({ path: './.env' })

const PORT = process.env.CLIENT_SERVER_PORT

const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(PORT, function () {
   console.log(`🚀 UI started on port ${PORT}`);
});
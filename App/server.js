import { dotenv } from 'dotenv';
dotenv.config();

const PORT = process.env.CLIENT_SERVER_PORT || 8000

const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(PORT, function () {
   console.log(`🚀 UI started on port ${PORT}`);
});
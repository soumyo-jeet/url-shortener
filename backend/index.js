const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./db');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Enhanced CORS
app.use(cors());

app.use(express.json());

// Database connection
connectToMongo()

// Routes
app.get('/', (req, res) => res.status(200).send("Server is running..."));
app.use('/api/urls', require('./routes/urls'));
app.use('/', require('./routes/redirect'));

// Test endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const count = await require('./model/url').find({});
    res.json({ dbConnected: true, count });
  } catch (err) {
    res.json({ dbConnected: false, error: err.message });
  }
});

// vercel
module.exports = app;

//localhost
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
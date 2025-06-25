const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./db');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/urls', require('./routes/urls'));
app.use('/', require('./routes/redirect'));

// Export for Vercel
module.exports = app;

// Local development
if (require.main === module) {
  connectToMongo();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
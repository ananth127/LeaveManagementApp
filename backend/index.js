const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect("mongodb://0.0.0.0:27017/ananth_s", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const leaveRouter = require('./routes/leave');

app.use('/api', loginRouter);
app.use('/signup', signupRouter);
app.use('/leave', leaveRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

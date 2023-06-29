const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/research_publication', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const paperSchema = new mongoose.Schema({
  title: String,
  author: String,
});

const Paper = mongoose.model('Paper', paperSchema);

const app = express();

// Middleware to parse request bodies as JSON
app.use(express.json());

// Custom middleware for formatting API responses
app.use((req, res, next) => {
  res.apiResponse = (data = {}, success = true, statusCode = 200, message = '') => {
    res.status(statusCode).json({
      data,
      success,
      statusCode,
      message
    });
  };
  next();
});

app.delete('/api/papers/:id', async (req, res) => {
  const paperId = req.params.id;

  try {
    const deletedPaper = await Paper.findByIdAndDelete(paperId);

    if (deletedPaper) {
      res.apiResponse({}, true, 200, 'Paper deleted successfully');
    } else {
      res.apiResponse({}, false, 404, 'Paper not found');
    }
  } catch (error) {
    console.error('Error deleting paper:', error);
    res.apiResponse({}, false, 500, 'Failed to delete the paper');
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.apiResponse({}, false, 500, 'Internal Server Error');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

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

// API endpoint to delete a paper
app.delete('/api/papers/:id', async (req, res) => {
  const paperId = req.params.id;

  try {
    const deletedPaper = await Paper.findByIdAndDelete(paperId);

    if (deletedPaper) {
      res.status(200).json({
        success: true,
        message: 'Paper deleted successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Paper not found',
      });
    }
  } catch (error) {
    console.error('Error deleting paper:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete the paper',
    });
  }
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
});

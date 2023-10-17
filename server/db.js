const mongoose = require('mongoose');

// Replace 'your_database_url' with your actual MongoDB URL
const mongoURI = 'mongodb+srv://mishkasathdeo:HdBJdEqaCbeeTkDg@cluster1.lsxcgsk.mongodb.net/store';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

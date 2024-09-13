const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://mofaith489:Virus202...@cluster0.ydph7v9.mongodb.net/test?retryWrites=true&w=majority';
// we certainly dont need these connection parameters because of the new mongodb updates
// // Connection parameters
// const connectionParams = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// };

// Connect to MongoDB
mongoose.connect(dbUrl)
  .then(() => {
    console.info('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


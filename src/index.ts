import mongoose from 'mongoose';
import config from './config.json';
import app from './app';
import { loadDataIfEmpty } from './helpers/loadCar';

const PORT = process.env.PORT || 3001;

const { database: { mongoose: { url } } } = config;

mongoose.connect(url)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    loadDataIfEmpty();
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('❌ Error connecting to MongoDB:', error);
  });



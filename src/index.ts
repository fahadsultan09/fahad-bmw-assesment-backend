import app from './app';
import config from './config.json';

const PORT = process.env.PORT || config.env.port || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

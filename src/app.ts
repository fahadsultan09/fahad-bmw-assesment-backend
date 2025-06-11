import express from 'express';
import bodyParser from 'body-parser';
import config from './config.json';

const cors = require('cors')
const routes = require('./routes/routes')

const app = express();

const { cors: corsConfig } = config;

app.use(cors({
  origin: corsConfig.origin,
  methods: corsConfig.methods.join(','),
  credentials: corsConfig.credentials,
}));

app.use(express.json());
app.use(bodyParser.json());

app.use('/api', routes);

export default app;

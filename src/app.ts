import fs from 'fs';
import csvParser from 'csv-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config.json';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import { Cars } from './models/carModel';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Connect to MongoDB
const {
    database: {
        mongoose: { url },
    },
} = config as {
    database: {
        mongoose: { url: string };
    };
};

mongoose
    .connect(url)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        loadDataIfEmpty();
    })
    .catch((error: Error) => {
        console.error('❌ Error connecting to MongoDB:', error);
    });

// Load CSV data if collection is empty
async function loadDataIfEmpty() {
    const count = await Cars.countDocuments();
    if (count > 0) {
        
        console.log('ℹ️ Collection already contains data. No new data loaded.');
        return;
    }

    console.log('⚠️ No data found in DB — loading from CSV...');

    const results: any[] = [];

    fs.createReadStream('./BMW_Aptitude_Test_Test_Data_ElectricCarData.csv')
        .pipe(csvParser())
        .on('data', (data: any) => {
            const transformedData = transformCarData(data);
            results.push(transformedData);
        })
        .on('end', async () => {
            await Cars.insertMany(results);
            console.log('✅ Data loaded successfully.',results);
        });
}

// Helper to transform CSV row
function transformCarData(data: any): any {
    if (data.FastCharge_KmH === '' || data.FastCharge_KmH === '-') {
        delete data.FastCharge_KmH;
    } else {
        data.FastCharge_KmH = parseFloat(data.FastCharge_KmH);
    }

    data.RapidCharge = data.RapidCharge === 'Yes';
    data.Date = new Date(data.Date);

    return data;
}

module.exports = app;

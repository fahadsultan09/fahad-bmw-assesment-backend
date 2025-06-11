import fs from 'fs';
import csvParser from 'csv-parser';
import { Cars } from '../models/carModel';


// Load CSV data if collection is empty
export const loadDataIfEmpty = async ()  => {
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
            console.log('✅ Data loaded successfully.', results);
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

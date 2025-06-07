import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for Cars data
export interface ICars extends Document {
  Brand: string;
  Model: string;
  AccelSec: number;
  TopSpeed_KmH: number;
  Range_Km: number;
  Efficiency_WhKm: number;
  FastCharge_KmH: number;
  RapidCharge: boolean;
  PowerTrain: string;
  PlugType: string;
  BodyStyle: string;
  Segment: string;
  Seats: number;
  PriceEuro: number;
  Date: Date;
}

// Define the schema
const CarSchema: Schema = new Schema({
  Brand: { type: String, required: true },
  Model: { type: String, required: true },
  AccelSec: { type: Number, required: true },
  TopSpeed_KmH: { type: Number, required: true },
  Range_Km: { type: Number, required: true },
  Efficiency_WhKm: { type: Number, required: true },
  FastCharge_KmH: { type: Number, required: false },
  RapidCharge: { type: Boolean, required: true },
  PowerTrain: { type: String, required: true },
  PlugType: { type: String, required: true },
  BodyStyle: { type: String, required: true },
  Segment: { type: String, required: true },
  Seats: { type: Number, required: true },
  PriceEuro: { type: Number, required: true },
  Date: { type: Date, required: true },
});

// Create and export the model
export const Cars = mongoose.model<ICars>('Cars', CarSchema);

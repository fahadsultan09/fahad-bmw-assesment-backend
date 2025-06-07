const { errorResponse, successResponse } = require("../helpers/responseHelpers");
import { StatusCodes } from "../helpers/status-codes";
const { Cars } = require('../models/carModel');

import { Request, Response } from 'express';

export const getAllElectricCars = async (req: Request, res: Response) => {
    console.log("here------------------>")
    try {
        const cars = await Cars.find();
        return res.status(StatusCodes.OK).send(successResponse(cars, "Cars fetched successfully !!"));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

export const getElectricCarByID = async (req: Request, res: Response) => {
    try {
        const carID = req.params.id;
        const car = await Cars.findById(carID);
        return res.status(StatusCodes.OK).send(successResponse(car, "Car fetched successfully !!"))
    } catch (error) {

    }
}

export const createElectricCars = async (req: Request, res: Response) => {
    try {
        const car = await Cars.create(req.body);
        return res.status(StatusCodes.OK).send(successResponse(car, "Car created successfully !!"));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

export const updateElectricCars = async (req: Request, res: Response) => {
    try {

        const carID = req.params.id;
        const updatedCar = await Cars.findByIdAndUpdate(carID, req.body, { new: true });
        console.log("updated car *************", updatedCar)
        if (!updatedCar) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Car not found' });
        }

        return res.status(StatusCodes.OK).send(successResponse(updatedCar, "Cars fetched successfully !!"));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

export const deleteElectricCars = async (req: Request, res: Response) => {
    try {
        const carID = req.params.id;
        const deletedCar = await Cars.findByIdAndDelete(carID);

        if (!deletedCar) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Car not found' });
        }

        return res.status(StatusCodes.OK).send({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
    }
}


export const searchCar = async (req: Request, res: Response) => {
    const { search, column, filterType, filterValue } = req.query;

    try {
        let query: any = {};

        // Search functionality
        if (search) {
            query.$or = Object.keys(Cars.schema.paths).map((key) => ({
                [key]: { $regex: search, $options: 'i' },
            }));
        }

        // Filter functionality
        if (column && filterType && filterValue) {
            const conditions: { [key: string]: any } = {
                contains: { [column as string]: { $regex: filterValue, $options: 'i' } },
                equals: { [column as string]: filterValue },
                startsWith: { [column as string]: { $regex: `^${filterValue}`, $options: 'i' } },
                endsWith: { [column as string]: { $regex: `${filterValue}$`, $options: 'i' } },
                isEmpty: { [column as string]: '' },
            };
            query = { ...query, ...conditions[filterType as string] };
        }

        const car = await Cars.find(query).limit(100);
        return res.status(StatusCodes.OK).send(successResponse(car, "Car fetched successfully !!"))

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

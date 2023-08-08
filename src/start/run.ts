import 'dotenv/config';
import { Application } from 'express';
import mongoose from "mongoose";
const PORT: String | Number = process.env.PORT || 3000;
const DB_URL: any = process.env.DB_URL;

export const run = async(app: Application): Promise<void> => {
    try {
        await mongoose.connect(DB_URL);

        app.listen(PORT, () => {
          console.log(`Server listening on port ${PORT}`);
        });
        
    } catch (error: unknown) {
        console.log(error);
    }
};
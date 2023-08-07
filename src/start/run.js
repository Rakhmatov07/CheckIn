import 'dotenv/config';
import mongoose from "mongoose";
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

export const run = async(app) => {
    try {
        await mongoose.connect(DB_URL);

        app.listen(PORT, () => {
          console.log(`Server listening on port ${PORT}`);
        });
        
    } catch (error) {
        console.log(error);
    }
};
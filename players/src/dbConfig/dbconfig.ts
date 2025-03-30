
import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('MongoDB Connected Successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB Connection Error. Please make sure MongoDB i running.' + err);
            process.exit()
        } )
    } catch (error) {
        console.log('Something Goes Wrong!');
        console.log(error);
        
        
    }
}
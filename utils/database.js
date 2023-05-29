import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery');
    if (isConnected) {
        console.log('connected Already');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'shared_prompt',
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        isConnected = true;
        console.log('Connected');

    } catch (err) {
        console.log(err);
    }
}
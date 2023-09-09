import mongoose from 'mongoose';

mongoose.connection.on("open", () => {
    console.log("database connected successfully")
})
mongoose.connection.on("end", () => {
    console.log("database connected successfully")
})
const url = "mongodb://127.0.0.1:27017/ticketingAuth"

const startDatabase = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as any);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};



export default startDatabase
import dotenv from "dotenv";
import {app} from "./App.js";
import connectDB from "./src/DB/DataBase.js"

// Load environment variables
dotenv.config({ path: './.env' });


connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port :${process.env.PORT}`)
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
import express from "express";
import cors from "cors";


const app=express();

// Enabling CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allowing only the specified origin to access resources
    credentials: true // Allowing cookies and other credentials to be sent in cross-origin requests
}))


// Exporting the app instance for use in other parts of the application
export { app }
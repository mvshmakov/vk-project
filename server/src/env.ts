import dotenv from "dotenv";
import fs from "fs";

const ENV_PATH = ".env";
const isInProduction = process.env.NODE_ENV === "production";

if (fs.existsSync(ENV_PATH)) {
    console.log("Using .env file to supply config environment variables");
    dotenv.config({ path: ENV_PATH });
} else {
    console.error("Create .env file from .env.example");
    process.exit(1);
}

export const MONGODB_URI = isInProduction ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];

if (!MONGODB_URI) {
    if (isInProduction) {
        console.error("No mongo connection string. Set MONGODB_URI environment variable."); // TODO: how to log this shit??
    } else {
        console.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}

// Static non-dotenv variables
export const PORT = 3000;

import dotenv from "dotenv";
import fs from "fs";
import { LoggerOptions } from "express-winston";
import { transports, format } from "winston";

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
export const STATIC_DIR = "../../client/dist";

export const LOGGER_OPTIONS: LoggerOptions = {
    transports: [
        new transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new transports.File({ filename: "debug.log", level: "debug" })
    ],
    format: format.combine(
        format.colorize(),
        format.json()
    )
};

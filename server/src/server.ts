import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import expressWinston from "express-winston";
import helmet from "helmet";
import mongoose from "mongoose";

import * as env from "./env";

import commonRoutes from "./routes";
import userRoutes from "./routes/api/v1/users";

// Setup an app
const app = express();

// MongoDB (mongoose)
mongoose
    .connect(env.MONGODB_URI, { useNewUrlParser: true });

mongoose
    .connection
    .on("error", console.error.bind(console, "connection error:"));

// Add some security
app.use(helmet());

// Enable CORS
app.use(cors());

// Set static root
app.use(express.static(env.STATIC_DIR));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add some compression
app.use(compression());

// Cookie Parser
app.use(cookieParser());

// Log before the routes
app.use(expressWinston.logger(env.LOGGER_OPTIONS));

// Routes
app.use(commonRoutes);
app.use(userRoutes);

// Debug redir to /
// TODO: deeplinking
if (process.env.NODE_ENV !== "production") {
    app.use((_req, res, next) => {
        res.status(404);
        res.redirect("/");
        next();
    });
}

// Log errors after the routes
app.use(expressWinston.errorLogger({...env.LOGGER_OPTIONS}));

export default app;

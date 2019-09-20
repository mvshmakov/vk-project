import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

import * as env from "./env";
import logger from "./utils/logger";

import commonRoutes from "./routes";
import userRoutes from "./routes/api/v1/users";
import subscriptionRoutes from "./routes/api/v1/subscriptions";

// Setup an app
const app = express();

// MongoDB (mongoose)
mongoose
    .connect(env.MONGODB_URI, { useNewUrlParser: true });

mongoose
    .connection
    .on("error", console.error.bind(console, "connection error:"));


// Limit overall RPS to 5 RPS per user
app.use(new rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 300, // limit each IP to 120 requests per windowMs
}));

// Add some security
app.use(helmet());

// Enable CORS
app.use(cors());

// Add some compression
app.use(compression());

// Cookie Parser
app.use(cookieParser());

// Log before the routes
app.use(logger);

// Set static root
app.use(express.static(env.STATIC_DIR));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use(commonRoutes);
app.use(userRoutes);
app.use(subscriptionRoutes);

app.use((_req, res, next) => {
    res.status(404);
    next();
});

// TODO: log errors after the routes

// Debug redir to /
// TODO: deeplinking
if (process.env.NODE_ENV !== "production") {
    app.use((_req, res, next) => {
        res.redirect("/");
        next();
    });
}

export default app;

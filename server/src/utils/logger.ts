import expressWinston, { LoggerOptions } from "express-winston";
import { transports, format } from "winston";

const LOGGER_DEV_OPTIONS: LoggerOptions = {
    transports: [
        new transports.Console({ level: "debug" })
    ],
    format: format.combine(
        format.colorize(),
        format.simple(),
        format.metadata(),
    ),
    expressFormat: true,
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}",
    colorize: true,
    ignoreRoute: () => false
};

const LOGGER_PROD_OPTIONS: LoggerOptions = {
    transports: [
        new transports.File({
            filename: "combined.log",
            level: "debug"
        })
    ],
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.metadata()
    ),
    expressFormat: true,
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}",
    ignoreRoute: () => false
};

export default expressWinston.logger(
    process.env.NODE_ENV === "production"
        ? LOGGER_PROD_OPTIONS
        : LOGGER_DEV_OPTIONS
);

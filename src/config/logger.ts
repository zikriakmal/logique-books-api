import winston from 'winston';

// Define the logger
const logger = winston.createLogger({
    level: 'info', // Set default level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        // You can add more transports here (e.g., file transport)
    ],
});

export default logger;
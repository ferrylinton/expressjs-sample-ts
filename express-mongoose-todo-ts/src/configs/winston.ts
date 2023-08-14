import appRoot from 'app-root-path';
import { createLogger, format, transports } from 'winston';
const { combine, splat, timestamp, printf, errors, json } = format;
const env = process.env.NODE_ENV || 'development';

const customFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
    if (stack) {
        return `${timestamp} [${level}] ${stack}`;
    } else if (meta && Object.keys(meta).length) {
        return `${timestamp} [${level}] ${message}, ${JSON.stringify(meta)}`;
    } else {
        return `${timestamp} [${level}] ${message}`;
    }
});

export const logger = createLogger({
    format: combine(
        errors({ stack: true })
    ),
    transports: [
        new transports.File({
            level: 'info',
            filename: `${appRoot}/logs/app.log`,
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            format: combine(
                splat(),
                timestamp({
                    format: 'YYYY-MM-DD.HH:mm:ss.SSS'
                }),
                customFormat
            )
        }),

    ],
    exitOnError: false
});

if (env !== 'production') {
    logger.add(new transports.Console({
        level: 'debug',
        format: combine(
            format.colorize(),
            timestamp({
                format: 'YYYY-MM-DD.HH:mm:ss.SSS'
            }),
            customFormat
        )
    }));
}

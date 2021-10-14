/**
 *
 *
 * different levels: error, warn, info, verbose, debug, silly
 */
// import get  from '../../config/config';
import * as winston from 'winston';
import moment from 'moment';
import {logDateFormat} from '../utils';

class TimestampFirst {
	enabled: boolean;
    constructor(enabled = true) {
        this.enabled = enabled;
    }
    transform(obj) {
        if (this.enabled) {
            return Object.assign({ timestamp: obj.timestamp }, obj);
        }
        return obj;
    }
}

var myFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), new TimestampFirst(true), winston.format.json());

const logger = winston.createLogger({
    level: 'info',
    // format: winston.format.json(),
    format: myFormat,
    transports: [
        new winston.transports.File({ filename: './logs/error_' + moment(new Date()).format(logDateFormat()) + '.log', level: 'error' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

export default logger;

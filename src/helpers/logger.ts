// @ts-ignore

import * as winston from 'winston'

var options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

var logger = winston.createLogger({
    defaultMeta: { service: (process.env.POD_NAME as string) },
    transports: [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

(logger as any)['streamMorgan'] = {
    elements: (tokens: any, req: any, res: any) => {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',

            'IP: ',
            req.ip,

            'UserId:',
            req.headers['authorization'] && req.headers['authorization'].split('.').length > 0 ? JSON.parse(new Buffer(req.headers['authorization'].split('.')[1], 'base64').toString('ascii')).id.replace(/\n$/, '') : '',

            ' - Request Body:',
            (tokens.url(req, res).includes('login') || tokens.url(req, res).includes('register')) ? 'sensnsitive data suppressed' : JSON.stringify(req.body),
        ].join(' ')
    },

    write: (message: any, encoding: any) => {
        logger.info(message)
    }
};




export {
    logger
};
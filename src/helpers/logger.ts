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

const enumerateErrorFormat = winston.format(info => {
    if ((info as any).message instanceof Error) {
      info.message = Object.assign({
        message: (info.message as any).message,
        stack: (info.message as any).stack
      }, info.message);
    }
  
    if (info instanceof Error) {
      return Object.assign({
        message: info.message,
        stack: info.stack
      }, info);
    }
  
    return info;
  });

var logger = winston.createLogger({
    defaultMeta: { service: (process.env.POD_NAME as string) },
    format: winston.format.combine(
        enumerateErrorFormat(),
        winston.format.json()
      ),
    transports: [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
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
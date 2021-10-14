/**
 *
 * @description Server and REST API config
 */
 import * as bodyParser from 'body-parser';
 import cors from 'cors';
 import dotenv from 'dotenv';
 import express, {  NextFunction,Request, Response } from 'express'
 import http from 'http';
 import helmet from 'helmet';
//import swaggerUi from 'swagger-ui-express';
//  import { internalServerError } from './helpers/response';
 import logger from './lib/logger';
 import user from './route/user/user.route';
import { StatusCodes } from 'http-status-codes';
import { responseGenerators } from './lib';
//  import { plateformAuthorizerMiddleware } from './middleware/plateform-authorization';
//  import {
//      refreshTokenHandler,
//      getMigrateBrand,
//      addContactMessage,
//      setIsTest,
//  } from './routes/common';
//  import superAdminRoutes from './routes/super-admin';
//  import tenantRoutes from './routes/tenant';
//  import * as swaggerDocument from './swagger.json';
 const app = express();
 
 let server = new http.Server(app);
 /**
  * Handle connection to socket.io.
  */
 dotenv.config();
 app.use(cors());
 app.use(helmet());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use((req, res, next) => {
     try {
         logger.info(`----------------------index.ts = ${req.body}`);
         const xForwardedFor = ((req.headers['x-forwarded-for'] || '') as string).replace(/:\d+$/, '');
         const ip = xForwardedFor || req.connection.remoteAddress;
         logger.info(
             `IMP - API called path: ${req.path} method: ${req.method}, query: ${JSON.stringify(
                 req.query,
             )}, remote address (main/proxy ip):${ip}, reference: ${req.headers.referer} and user-agent: ${
                 req.headers['user-agent']
             }`,
         );
     } catch (error) {
         logger.error(`error while printing caller info path: ${req.path}`);
     }
 
     next();
 });

const health = (req: Request, res: Response) => {
	res.json({ message: 'working', env: process.env.NODE_ENV, headers: req.headers });
};
app.get('/', health);
app.get('/health', health);
// app.get('/', (req, res) => {
//     res.send('start home service');
// })
//set api

app.use('/api/user',user)

//
// error handling.
//, next: NextFunction
app.use((error: any, req: Request, res: Response,next: NextFunction) => {
    console.log("app error----------------->",error.message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseGenerators({}, StatusCodes.INTERNAL_SERVER_ERROR, error, true))
    
});

// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default server;

import * as express from 'express';
import * as httpStatus from 'http-status-codes';
import { authenticate } from './Authenticate';


// import { Validator } from './validator';
import { I1 } from './interfaces';


class LogoutCntrlr {

  public router: express.Router = express.Router();
  public constructor() {
    LogoutCntrlr.setRouterMiddleWare(this.router);

  }

  public static setRouterMiddleWare(router: express.Router): void {
    router.route('/')
      .post(authenticate.authenticateToken, LogoutCntrlr.addLogout);


  }

  public static addLogout(req: express.Request, res: express.Response): void {
    console.log('addLogout -', req.url);
    //let body: I1 = req.body;
    const authHeader = req.headers['authorization']
    const token: string = (authHeader && authHeader.split(' ')[1]) || ""
    authenticate.logout(token);
    res.status(httpStatus.StatusCodes.OK).send("Logged out");

    //res.status(httpStatus.INTERNAL_SERVER_ERROR).send('NOT IMPLEMENTED');

  }


}

export let logoutcntrlr = new LogoutCntrlr();




import * as express from 'express';
import * as httpStatus from 'http-status-codes';
import { authenticate } from './Authenticate';
import { decrypt } from './decrypt'
import { Database, database as db, IMDBUsers } from "./database"


// import { Validator } from './validator';
import { I2 } from './interfaces';


class MessageCntrlr {

  public router: express.Router = express.Router();
  public constructor() {
    MessageCntrlr.setRouterMiddleWare(this.router);

  }

  public static setRouterMiddleWare(router: express.Router): void {
    router.route('/')
      .post(authenticate.authenticateToken, MessageCntrlr.addMessage)
      .get(authenticate.authenticateToken, MessageCntrlr.getMessage);

  }

  public static addMessage(req: express.Request, res: express.Response): void {
    console.log('addMessage -', req.url);
    //let body: I2 = req.body;
    console.log("hii")
    console.log(req.body.message, req.body.key);

    db.MilitaryDatabase.encMsg.key = req.body.key;
    db.MilitaryDatabase.encMsg.msg = req.body.message;

    res.status(httpStatus.StatusCodes.OK).send(decrypt.decrypt(req.body.message, req.body.key));

    // res.status(httpStatus.INTERNAL_SERVER_ERROR).send('NOT IMPLEMENTED');

  }

  public static getMessage(req: express.Request, res: express.Response): void {
    res.send(decrypt.decrypt(db.MilitaryDatabase.encMsg.msg, db.MilitaryDatabase.encMsg.key));
    res.status(httpStatus.StatusCodes.OK).send(decrypt.decrypt(req.body.message, req.body.key));
  }

}

export let messagecntrlr = new MessageCntrlr();



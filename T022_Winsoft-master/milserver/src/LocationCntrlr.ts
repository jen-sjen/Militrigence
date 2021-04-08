
import * as express from 'express';
import * as httpStatus from 'http-status-codes';
import { authenticate } from './Authenticate';
import { dijkstra as graph } from './graph';
import { Database, database as db, IMDBUsers } from "./database"

// import { Validator } from './validator';
import { I1 } from './interfaces';


class LocationCntrlr {

  public router: express.Router = express.Router();
  public constructor() {
    LocationCntrlr.setRouterMiddleWare(this.router);

  }

  public static setRouterMiddleWare(router: express.Router): void {
    router.route('/')
      .post(authenticate.authenticateToken, LocationCntrlr.addLocations)
      .get(authenticate.authenticateToken, LocationCntrlr.getLocations);


  }
  static getLocations(req: express.Request, res: express.Response) {
    res.status(httpStatus.StatusCodes.OK).send(db.MilitaryDatabase.bases);
  }

  public static addLocations(req: express.Request, res: express.Response): void {
    console.log('addLocation -', req.url);

    db.MilitaryDatabase.bases = graph.findnode(req.body.target, []);

    //res.status(httpStatus.StatusCodes.OK).send(db.MilitaryDatabase.bases);
    res.status(httpStatus.StatusCodes.OK).send(graph.findnode(req.body.target, []));
    // res.status(httpStatus.INTERNAL_SERVER_ERROR).send('NOT IMPLEMENTED');

  }

}

export let locationcntrlr = new LocationCntrlr();



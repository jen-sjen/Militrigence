

export interface IMDBUsers {
  userid: string;
  password: string
}

export interface IEncMsg {
  msg: string;
  key: string;
}

export interface IBases {
  us: string;
  them: string[];
}

export interface IMDB {
  users: IMDBUsers[];

  // insession: {[key:string]: any;};

  insession: string[];

  places: string[];

  encMsg: IEncMsg;

  bases: IBases;

}

export class Database {
  public MilitaryDatabase: IMDB = {
    "users":
      [
        {
          userid: "MX12345678",
          password: "20b80c8434c9a000256a67bb655ec2d9a3d16e8d9a940d1b295e5cfd146e966b"
        }
      ],

    "insession": [
      // "idk"
    ],

    "places": [
      "Lachulung La",
      "Sia La",
      "Tanglang La",
      "Khardung La",
      "Sasser Pass",
      "Zoji La",
      "Rezang La",
      "Marsimik La",
      "Gyong La",
      "Indira Col",
      "Pensi La"
    ],

    "encMsg": {
      "msg": '',
      "key": ''
    },

    "bases": {
      "us": '',
      "them": []
    }
  }
}

export let database: Database = new Database();
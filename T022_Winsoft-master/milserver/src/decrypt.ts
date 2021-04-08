import { Database, database as db, IMDBUsers } from "./database"

class Decrypt {
  public range(start: number, end: number) {
    return Array.from({ length: (end - start) }, (v, k) => k + start);
  }
  public decrypt(messageog: string, keystr: string) {
    let message = messageog.split("")
    let rows = Math.floor(message.length / keystr.length);
    let cols = keystr.length;
    let encrypt: string[][] = [];
    let dict: { [id: string]: number } = {}
    let key = keystr.split("")
    let keys = key.slice()
    keys.sort()
    let indexes = []

    for (let i of this.range(0, cols)) {
      dict[keys[i]] = i;
    }

    for (let ikey of key) {
      indexes.push(dict[ikey])
    }

    for (let j of this.range(0, cols)) {
      let minarr = []
      for (let i of this.range(rows * j, (rows * j) + rows)) {
        minarr.push(message[i]);
      }
      encrypt.push(minarr)
    }

    let decoded = ""
    for (let j of this.range(0, rows)) {
      for (let i of indexes) {
        console.log(encrypt[i][j])
        if (encrypt[i][j] !== "_")
          decoded += encrypt[i][j]
      }
    }

    let words = decoded.split(" ")
    let locations = []
    console.log(words)

    for (let place of db.MilitaryDatabase.places) {
      if (decoded.includes(place))
        locations.push(place);
    }

    console.log(decoded, locations)

    return { "message": decoded, "infiltrated": locations };
  }
}

export let decrypt = new Decrypt();
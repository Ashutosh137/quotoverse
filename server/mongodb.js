import { MongoClient } from "mongodb";

const dbName = "Cluster0";

let cachedClient = null;

export async function Connectmongodb() {
  try {
    if (cachedClient) {
      return cachedClient.db(dbName);
    }

    const url = process.env.mongodburl;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    cachedClient = client;
    return db;
  } catch {
    (err) => {
      console.log(err);
    };
  }
}

export default Connectmongodb;

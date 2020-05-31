import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
class Database {
  public client: MongoClient;
  constructor(public collection: string, public uri: string) {
    this.collection = collection;
    this.uri = uri;
    this.client = {} as MongoClient;
  }
  connect() {
    const client = new MongoClient();
    client.connectWithUri(this.uri);
    this.client = client;
  }
  get getDatabase() {
    return this.client.database(this.collection);
  }
}

const COLLECTION = Deno.env.get("DB_COLLECTION") || "denoDark";
const HOST = Deno.env.get("DB_HOST") || '127.0.0.1';
const USER = Deno.env.get("DB_USER") || 'denoDark';
const PASSWORD = Deno.env.get("DB_PASSWORD") || 'denoDark';
const PORT = Deno.env.get("DB_PORT") || '27017';
const URI = `mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${COLLECTION}?authSource=${COLLECTION}`;
const db = new Database(COLLECTION, URI);
db.connect();

export default db;
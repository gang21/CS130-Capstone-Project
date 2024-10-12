// db.ts
import { Db, MongoClient } from "mongodb";
import { UserClient } from "../clients";
import { MONGO_PASSWORD, MONGO_USERNAME } from "../settings";

let db: Db;
let userClient: UserClient;

export async function initializeClients() {
  const CONNECTION_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@fraudninja.eoeqf.mongodb.net/fraud_ninja_database?retryWrites=true&w=majority&appName=FraudNinja`;
  const client = new MongoClient(CONNECTION_URL);

  await client.connect();
  db = client.db();

  // Initialize your clients here
  userClient = new UserClient(db);

  console.log("MongoDB connected");

  // Return the initialized clients for use in controllers or routes
  return { db, userClient };
}

export { db, userClient };
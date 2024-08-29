import {
  Account,
  Client,
  Databases,
  Messaging,
  Storage,
  Users,
} from "node-appwrite";

export const {
  PROJECT_ID,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  API_KEY,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new Databases(client);
export const storage = new Storage(client);
export const messaging = new Messaging(client);
const account = new Account(client);
export const users = new Users(client);


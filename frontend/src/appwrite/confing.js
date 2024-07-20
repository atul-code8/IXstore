import { Client, Account, Teams } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_ENDPOINT) // Your API Endpoint
  .setProject(import.meta.env.VITE_PROJECT_ID); // Your project ID

const account = new Account(client);
const teams = new Teams(client);

export {client, account, teams}

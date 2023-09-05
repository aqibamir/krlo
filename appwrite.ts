import { Client, Account, ID, Databases, Storage, Permission } from "appwrite";
import { data } from "autoprefixer";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("64f7386c404d881ef159");

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage, ID };

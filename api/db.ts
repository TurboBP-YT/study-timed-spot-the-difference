import { MongoClient, ServerApiVersion } from 'mongodb';
const uri:string = "mongodb+srv://<mongo_username>:<mongo_password>@cluster0.4ruts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export function getClient():MongoClient {
  console.log('db username = ' + process.env['mongo_username'])
    return new MongoClient(uri.replace('<mongo_username>',process.env['mongo_username']).replace('<mongo_password>',process.env['mongo_password']), {
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        }
    });
}

export async function dbOperation(client:MongoClient, callback:Function) {
    console.log('start dbOperation');
    try {
      // Connects the client to the server	(optional starting in v4.7)
      await client.connect();
      await callback(client.db("db").collection('responses'));
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
    console.log('end dbOperation');
}
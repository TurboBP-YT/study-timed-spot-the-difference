import { MongoClient, ServerApiVersion } from 'mongodb';
const uri:string = "mongodb+srv://<db_username>:<db_password>@cluster0.4ruts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export function getClient():MongoClient {
  console.log('db username = ' + process.env['db_username'])
    return new MongoClient(uri.replace('<db_username>',process.env['db_username']).replace('<db_password>',process.env['db_password']), {
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
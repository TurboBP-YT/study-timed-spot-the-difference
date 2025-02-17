import { v6 as uuidv6 } from 'uuid';
import { dbOperation, getClient } from './db.js';
import { Collection } from 'mongodb';

export async function GET(request: Request) {
    // Creates a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = getClient();
    let uuid:string = uuidv6();
    while (true) {
        let isFound:boolean = true; // ensures unique IDs
        await dbOperation(client,async (col:Collection) => {
            isFound = (await col.countDocuments({ "identifier": uuid })) > 0;
        }).catch(console.dir);
        if (!isFound) {
            break;
        }
        uuid = uuidv6();
    }
    return Response.json({uuid});
}
import { v6 as uuidv6 } from 'uuid';
import { dbOperation, getClient } from './db.js';
import { Collection } from 'mongodb';

export async function GET(request: Request) {
    // Creates a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = getClient();
    let uuid:string = uuidv6();

    let dbAccessWorked:boolean = false;
    while (true) {
        let isFound:boolean = true; // ensures unique IDs
        dbAccessWorked = false;
        await dbOperation(client,async (col:Collection) => {
            console.log('db op');
            isFound = (await col.countDocuments({ "identifier": uuid })) > 0;
            dbAccessWorked = true;
        }).catch(console.dir);
        if ((!dbAccessWorked) || (!isFound)) {
            break;
        }
        uuid = uuidv6();
    }
    if (!dbAccessWorked) {
        return new Response('failed', {
            status: 500,
        });
    }
    return Response.json({uuid});
}
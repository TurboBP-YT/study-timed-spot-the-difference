import { dbOperation, getClient } from './db.js';
import { Collection } from 'mongodb';

export async function POST(request: Request) {
    const rawBody = await request.text();
    let bodyJSON;
    try {
        bodyJSON = JSON.parse(rawBody);
    }
    catch {
        return new Response('failed', {
            status: 400,
        });
    }

    const client = getClient();

    let dbAccessWorked:boolean = false;
    await dbOperation(client,async (col:Collection) => {
        const query = { identifier: bodyJSON.identifier };
        const update = { $set: bodyJSON};
        const options = { upsert: true };
        await col.updateOne(query, update, options);
    }).catch(console.dir);
    if (!dbAccessWorked) {
        return new Response('failed', {
            status: 500,
        });
    }
    return new Response('accepted');
}
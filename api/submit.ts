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
            status: 200,
        });
    }

    const client = getClient();

    await dbOperation(client,async (col:Collection) => {
        const query = { identifier: bodyJSON.identifier };
        const update = { $set: bodyJSON};
        const options = { upsert: true };
        col.updateOne(query, update, options);
    }).catch(console.dir);

    return new Response('accepted');
}
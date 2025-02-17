import { v6 as uuidv6 } from 'uuid';

export async function GET(request: Request) {
    return Response.json({uuid:uuidv6()});
}
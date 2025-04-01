// import { getUsers } from "../../../../back_end/controllers/users";

// export async function GET() {
//   const users = await getUsers();

//   return new Response(JSON.stringify({ data: users }));
// }

// export async function POST(req: Request, res: Response) {
//   const body = await req.json();
//   console.log({ body });

//   //   return await checkUser({ email: body.email, password: body.password });
// }

import { runQuery } from "../../../../util/queryService";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const incomingName = "boldo";
    // const createTable = `CREATE TABLE "public"."Food" ("id" integer PRIMARY KEY,"name" varchar NOT NULL,"price" integer);`;
    const getUser = `SELECT name,password FROM "User" WHERE name='${incomingName}' AND password='1235';`;

    const user = await runQuery(getUser);
    if (user.length <= 0) {
      return new NextResponse(JSON.stringify({ error: "user not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ foods: user }));
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}

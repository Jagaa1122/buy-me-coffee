import { NextResponse } from "next/server";
import { runQuery } from "../../../../../util/queryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { username, password } = await req.json();
    console.log(password);
    const getUser = `SELECT * FROM "users" WHERE username = $1`;
    const user = await runQuery(getUser, [username]);
    if (!user || user.length === 0) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const checkPassword = user[0].password === password;
    if (!checkPassword) {
      return new NextResponse(JSON.stringify({ error: "Incorrect password" }), {
        status: 401,
      });
    }

    return new NextResponse(
      JSON.stringify({
        user: user[0],
        massage: " amjilttai nevterlee",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to run query:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch user" }), {
      status: 500,
    });
  }
}

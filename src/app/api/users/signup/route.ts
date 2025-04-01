import { NextResponse } from "next/server";
import { runQuery } from "../../../../../util/queryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password, username } = await req.json();

    const createUser = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;

    const user = await runQuery(createUser, [username, email, password]);

    return new NextResponse(
      JSON.stringify({ user: user, message: "Amjilttai burtgelee" })
    );
  } catch (error) {
    console.error("Failed to run query:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}

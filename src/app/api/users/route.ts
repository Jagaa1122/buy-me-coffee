import { NextResponse } from "next/server";
import { runQuery } from "../../../../util/queryService";

export async function GET(): Promise<NextResponse> {
  try {
    const getAllUsers = `SELECT * FROM profiles`;

    const users = await runQuery(getAllUsers);

    console.log("users", users);

    if (!Array.isArray(users) || users.length === 0) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse(JSON.stringify({ error: "aldaa garlaa" }), {
      status: 500,
    });
  }
}

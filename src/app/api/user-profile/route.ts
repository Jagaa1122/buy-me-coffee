import { NextResponse } from "next/server";
import { runQuery } from "../../../../util/queryService";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "User ID is required" }),
        { status: 400 }
      );
    }

    const getUserWithProfileQuery = `
      SELECT u.*, p.*
      FROM users u
      LEFT JOIN profiles p ON u.profile_id = p.id
      WHERE u.id = $1
    `;

    const result = await runQuery(getUserWithProfileQuery, [userId]);

    if (!result || result.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(result[0]), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to fetch user with profile:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch user data" }),
      { status: 500 }
    );
  }
}
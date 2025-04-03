import { NextResponse } from "next/server";
import { runQuery } from "../../../../../util/queryService";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    
    if (!username) {
      return new NextResponse(JSON.stringify({ error: "Username is required" }), {
        status: 400,
      });
    }
    
    const checkUsernameQuery = `SELECT * FROM users WHERE username = $1`;
    const result = await runQuery(checkUsernameQuery, [username]);
    
    return new NextResponse(JSON.stringify({ 
      exists: result && result.length > 0 
    }));
    
  } catch (error) {
    console.error("Failed to check username:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to check username" }), {
      status: 500,
    });
  }
}
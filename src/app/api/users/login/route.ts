import { NextResponse } from "next/server";
import { runQuery } from "../../../../../util/queryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      );
    }
    
    const getUserQuery = `SELECT * FROM users WHERE email = $1`;
    const users = await runQuery(getUserQuery, [email]);
    
    if (!users || users.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No account found with this email" }), 
        { status: 404 }
      );
    }

    const user = users[0];
    
    if (user.password !== password) {
      return new NextResponse(
        JSON.stringify({ error: "Incorrect password" }), 
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;
    
    return new NextResponse(
      JSON.stringify({
        user: userWithoutPassword,
        message: "Successfully logged in",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login failed:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to process login" }), 
      { status: 500 }
    );
  }
}
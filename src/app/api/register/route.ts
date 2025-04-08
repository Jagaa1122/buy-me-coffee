import { NextResponse } from "next/server";
import { runQuery } from "../../../../util/queryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    console.log("Processing registration request:", {
      username,
      email,
      password: "REDACTED",
    });

    if (!username || !email || !password) {
      return new NextResponse(
        JSON.stringify({
          error: "Missing required fields",
          message: "Username, email, and password are required",
        }),
        { status: 400 }
      );
    }

    const checkUsername = `SELECT * FROM users WHERE username = $1`;
    const usernameExists = await runQuery(checkUsername, [username]);

    if (usernameExists && usernameExists.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Username already exists",
          message: "This username is already taken",
        }),
        { status: 409 }
      );
    }

    const checkEmail = `SELECT * FROM users WHERE email = $1`;
    const emailExists = await runQuery(checkEmail, [email]);

    if (emailExists && emailExists.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Email already exists",
          message: "This email is already registered",
        }),
        { status: 409 }
      );
    }

    const createUser = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email`;
    const result = await runQuery(createUser, [username, email, password]);

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Account created successfully",
        user: result[0],
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create user:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Server error",
        message: "Failed to create account",
      }),
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { runQuery } from "../../../../util/queryService"; // Assume this is a utility for running SQL queries

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { about, socialMediaURL, avatarImage, name } = body;

    console.log("Processing profile creation request:", {
      name,
      about,
      socialMediaURL,
      avatarImage,
    });

    // // Check if the user exists before creating the profile
    // const checkUserExists = `SELECT * FROM users WHERE id = $1`;
    // const userExists = await runQuery(checkUserExists, [user_id]);

    // if (!userExists || userExists.length === 0) {
    //   return new NextResponse(
    //     JSON.stringify({
    //       error: "User not found",
    //       message: "The user with the provided ID does not exist",
    //     }),
    //     { status: 404 }
    //   );
    // }

    // Insert the new profile into the profiles table
    const createProfile = `
      INSERT INTO profiles ( about, socialMediaURL, name, avatarImage)
      VALUES ($1, $2, $3, $4)
      RETURNING id, about, socialMediaURL, name, avatarImage, createdAt
    `;
    const result = await runQuery(createProfile, [
      name,
      about,
      socialMediaURL,
      avatarImage,
    ]);

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Profile created successfully",
        profile: result[0], // Return the created profile
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create profile:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Server error",
        message: "Failed to create profile",
      }),
      { status: 500 }
    );
  }
}

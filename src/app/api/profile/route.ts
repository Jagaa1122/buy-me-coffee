import { NextResponse } from "next/server";
import { runQuery } from "../../../../util/queryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { about, socialMediaURL, avatarImage, name } = body;

    console.log("Processing profile creation request:", {
      name,
      about,
      avatarImage,
      socialMediaURL,
    });

    const createProfile = `
      INSERT INTO profiles (name, about, avatarImage, socialMediaURL)
      VALUES ($1, $2, $3, $4)
      RETURNING id, about, socialMediaURL, name, avatarImage, createdAt
    `;
    const result = await runQuery(createProfile, [
      name,
      about,
      avatarImage,
      socialMediaURL,
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

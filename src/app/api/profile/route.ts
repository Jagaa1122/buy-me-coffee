import { NextResponse } from "next/server";
import { runQuery } from "../../../../util/queryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { about, socialMediaURL, avatarImage, name, user_id } = body;

    console.log("Processing profile creation request:", {
      name,
      about,
      avatarImage,
      socialMediaURL,
      user_id,
    });

    const createProfile = `
      INSERT INTO profiles (name, about, avatarImage, socialMediaURL, createdAt, updatedAt)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id
    `;
    
    const profileResult = await runQuery(createProfile, [
      name,
      about,
      avatarImage,
      socialMediaURL,
    ]);
    
    console.log("Profile created with result:", profileResult);
    
    if (!profileResult || profileResult.length === 0) {
      throw new Error("Failed to create profile - no ID returned");
    }
    
    const profileId = profileResult[0].id;
    console.log(`Profile created with ID: ${profileId}`);
    
    if (user_id) {
      console.log(`Updating user ${user_id} with profile_id ${profileId}`);
      
      const updateUserQuery = `
        UPDATE users 
        SET profile_id = $1, updated_at = NOW() 
        WHERE id = $2
      `;
      
      await runQuery(updateUserQuery, [profileId, user_id]);
      
      const checkUserQuery = `SELECT id, profile_id FROM users WHERE id = $1`;
      const userResult = await runQuery(checkUserQuery, [user_id]);
      console.log("User after update:", userResult);
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Profile created successfully",
        profileId: profileId
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create profile:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Server error",
        message: "Failed to create profile",
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { runQuery } from "../../../../../util/queryService";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const profileId = params.id;

    if (!profileId) {
      return new NextResponse(
        JSON.stringify({ error: "Profile ID is required" }),
        { status: 400 }
      );
    }

    const getProfileQuery = `SELECT * FROM profiles WHERE id = $1`;
    const profile = await runQuery(getProfileQuery, [profileId]);

    if (!profile || profile.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Profile not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(profile[0]), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch profile" }),
      { status: 500 }
    );
  }
}
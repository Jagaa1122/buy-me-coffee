import { NextResponse } from "next/server";
import { runQuery } from "../../../../util/queryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { country, firstname, lastname, cardnumber, expirydate } = body;

    console.log("Processing bankcard creation request:", {
      country,
      firstname,
      lastname,
      cardnumber,
      expirydate,
    });

    const bankcard = `
      INSERT INTO bankcard (country, firstname, lastname, cardnumber,expirydate)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, country, firstname, lastname, cardnumber,expirydate, createdAt
    `;
    const result = await runQuery(bankcard, [
      country,
      firstname,
      lastname,
      cardnumber,
      expirydate,
    ]);

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Bankcard details successfully",
        profile: result[0], // Return the created bankcard
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create bankcard details:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Server error",
        message: "Failed to create bankcard",
      }),
      { status: 500 }
    );
  }
}

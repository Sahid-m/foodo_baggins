import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const amount = searchParams.get("amount");
  const apiKey = process.env.VERDN_API_KEY;
  // Make the external API request
  const response = await fetch("https://api.verdn.com/v2/pledge-transaction", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`, // Use the API key
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reference: `${Math.random()}`, // Use 'id' dynamically
      recipient: {
        email: "zohaib.ehtesham@gmail.com",
      },
      pledges: [
        {
          impact: {
            offeringId: id,
            amount: Number(amount), // Convert 'amount' to a number
          },
        },
      ],
    }),
  });

  console.log("Verdn API REQUEST SUCCESSFUL WITH ID : ");
  console.log(id + " " + amount);

  return NextResponse.json({});
}

import { emailService } from "@/backend/services/emailService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await emailService.sendCustomerOfferFormNotification(
      data.firstName,
      data.lastName,
      data.companyName,
      data.companyWebsite,
      data.emailAddress,
      data.phoneNumber,
      data.propertyDescription
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

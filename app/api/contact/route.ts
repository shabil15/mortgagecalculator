import { NextResponse } from "next/server";

interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  propertyValue: number;
  monthlySalary: number;
}

export async function POST(req: Request) {
  try {
    const body: ContactRequest = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.propertyValue || !body.monthlySalary) {
      return NextResponse.json(
        {
          status: "error",
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid email format",
        },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid phone number",
        },
        { status: 400 }
      );
    }

    // Log the lead (in production, save to database)
    console.log("New lead received:", body);

    // Return success response
    return NextResponse.json(
      {
        status: "success",
        message: "Lead received",
        data: {
          name: body.name,
          email: body.email,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact request:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

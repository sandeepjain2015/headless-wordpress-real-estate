import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      subject,
      message,
    } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "Invalid email address.",
        },
        {
          status: 400,
        }
      );
    }

    await sendContactEmail({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
// app/api/contact/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Create a transporter object using Gmail's SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 1. Email to the business owner (you)
    const mailToAdminOptions = {
      from: process.env.GMAIL_USER, // sender address
      to: process.env.RECIPIENT_EMAIL, // list of receivers
      subject: `New Inquiry from ${name} - Dharamraj Polymer`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // 2. Auto-reply email to the user
    const mailToUserOptions = {
      from: `"Dharamraj Polymer" <${process.env.GMAIL_USER}>`, // sender address
      to: email, // user's email
      subject: `Thank you for your inquiry!`,
      html: `
        <h1>Thank you for contacting Dharamraj Polymer!</h1>
        <p>Hi ${name},</p>
        <p>We have received your inquiry and appreciate you reaching out to us. Our team will review your message and get back to you within 24 hours.</p>
        <p>Best regards,</p>
        <p>The Dharamraj Polymer Team</p>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailToAdminOptions),
      transporter.sendMail(mailToUserOptions),
    ]);
    
    return NextResponse.json(
      { message: "Emails sent successfully!" },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send emails." },
      { status: 500 }
    );
  }
}
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type ContactEmail = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmail) {
  await transporter.sendMail({
    from: `"Tikamgarh Properties" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `New Contact Form: ${subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.6">
        <h2>New Contact Form Submission</h2>

        <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse">
          <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
          </tr>

          <tr>
            <td><strong>Subject</strong></td>
            <td>${subject}</td>
          </tr>
        </table>

        <br/>

        <h3>Message</h3>

        <p>${message.replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  });
}
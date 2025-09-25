import nodemailer from "nodemailer";

export async function sendVerificationEmail(to: string, url: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"HR System" <${process.env.SMTP_USER}>`,
      to,
      subject: "Verify your email",
      html: `
        <h2>Welcome!</h2>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${url}">${url}</a>
      `,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
}

import nodemailer from "nodemailer";

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "yourgmail@gmail.com",
        pass: "your-app-password",
      },
    });

    const info = await transporter.sendMail({
      from: `"HR System" <yourgmail@gmail.com>`,
      to: "yourpersonal@gmail.com",
      subject: "Test Email",
      html: "<h1>Hello!</h1><p>This is a test.</p>",
    });

    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Email failed:", err);
  }
})();

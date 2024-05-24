import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

async function sendEmail({ email, html, subject, name }) {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: `<h1>Contact Form</h1><br>
    <b>Name</b>: ${name}<br>
    <b>Email</b>: ${email}<br>
    <b>Message</b>: ${html}`,
  };

  let info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  return info;
}

export { sendEmail };

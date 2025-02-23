import nodemailer from "nodemailer";

const SMTP_PASSWORD="cmrb yaxv znlv nvez"
const SMTP_USER="dezappwow@gmail.com"

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
    },
});

export async function sendEmail(to: string, body: string, subject: string) {
    await transporter.sendMail({
        from: SMTP_USER,
        to,
        subject: subject,
        text: body
    })
    console.log(`Email sent to ${to}`)
}
import User from "@/models/userModel"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"



export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10,)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpires: Date.now() + 3600000})
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordExpires: Date.now() + 3600000})
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: process.env.USER_ID,
            pass: process.env.PASSWORD_MAILER
            }
        });


        const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse

    } catch (error: any) {
        throw new Error(error.message) 
    }
}
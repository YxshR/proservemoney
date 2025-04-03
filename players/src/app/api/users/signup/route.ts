import {connect} from "@/dbConfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"


connect()


export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody)
        const user = await User.findOne({email})

        if (user) {
            return NextResponse.json({error: "User already existed"}, {status:400})
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        console.log(newUser.password)

        const savedUser = await newUser.save()
        console.log(savedUser)

        //send verification email

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json(
            {
                message: "User created Successfully",
                success: true,
                savedUser
            }
        )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status:500}
        )
    }
}   
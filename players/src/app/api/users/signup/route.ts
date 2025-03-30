import {connect} from "@/dbConfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody)
        const user = User.findOne(email)

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

        const savedUser = await newUser.save()
        console.log(savedUser)

        return NextResponse.json(
            {
                message: "User created Successfully",
                success: true,
                savedUser
            }
        )

    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status:500}
        )
    }
}
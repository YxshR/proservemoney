import { connect } from "@/dbConfig/dbconfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";


connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password")
        console.log("user", user)
        return NextResponse.json({
            message: "User Found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}
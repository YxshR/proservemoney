"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {toast} from "react-hot-toast"

export default function ProfilePage() {

    const router = useRouter()
    // const [user, setUser] = useState({ name: "", email: "" })
    const [user, setUser] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)

            toast.error(error.message)
        }
    }

    const getUserDetail = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data)
        setUser(res.data.data._id)
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-3 rounded bg-red-500">{user === 'nothing' ? "Nothing" : <Link href={`/profile/${user}`}>{user}</Link>}</h2>
            <hr />
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            <button onClick={getUserDetail} className="bg-red-500 mt-4 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">Get User Detail</button>
        </div>
    )
}
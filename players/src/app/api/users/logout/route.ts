import { NextResponse } from "next/server"

export async function GET(req,res) {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
        return new Response('User not found', { 
            status: 404,
            headers: {
                'Content-Type': 'text/plain',
                },
                });
                }
}

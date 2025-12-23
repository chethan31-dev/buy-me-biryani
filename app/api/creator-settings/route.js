import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized access detected." }, { status: 401 });
    }

    try {
        await connectDb();
        const data = await req.json();

        // Find and update the user's creator credentials
        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            {
                name: data.name,
                profilepic: data.profilepic,
                razorpayid: data.razorpayid,
                razorpaysecret: data.razorpaysecret,
                updatedAt: Date.now()
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User identity mismatch." }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Vault configuration updated." });
    } catch (error) {
        console.error("Creator Settings Update Error:", error);
        return NextResponse.json({ error: "Failed to synchronize vault. Check database connection." }, { status: 500 });
    }
}

import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();

        // Find users who have set up a razorpayid (these are our 'creators')
        const creators = await User.find({ razorpayid: { $exists: true, $ne: "" } })
            .select("name username profilepic")
            .lean();

        // If no creators in DB, return a few dummy ones for the demo
        if (creators.length === 0) {
            return NextResponse.json([
                {
                    name: "Chethan Mudhiraj",
                    username: "chethanmudhiraj3107",
                    profilepic: "/user_icon.png"
                },
                {
                    name: "Cyber Chef",
                    username: "cyberchef",
                    profilepic: "/user_icon.png"
                }
            ]);
        }

        return NextResponse.json(creators);
    } catch (error) {
        console.error("Fetch Creators Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

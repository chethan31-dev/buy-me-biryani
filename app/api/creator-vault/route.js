import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username') || "chethanmudhiraj3107";

    try {
        await connectDb();

        // Fetch specific creator and explicitly exclude the secret
        const creator = await User.findOne({ username: username })
            .select("-razorpaysecret")
            .lean();

        if (!creator) {
            // If DB is connected but user is missing, check if it's the default demo user
            if (username === "chethanmudhiraj3107") {
                return NextResponse.json({
                    name: "Chethan Mudhiraj (Demo)",
                    username: "chethanmudhiraj3107",
                    profilepic: "/user_icon.png",
                    razorpayid: "rzp_test_placeholder"
                });
            }
            return NextResponse.json({ error: "Creator not found in the grid." }, { status: 404 });
        }

        return NextResponse.json(creator);
    } catch (error) {
        console.error("Vault API Error:", error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

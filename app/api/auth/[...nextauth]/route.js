import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(`=> SignIn Attempt: ${account.provider} for ${user.email}`);
      try {
        await connectDb()

        const currentUser = await User.findOne({ email: user.email })

        if (!currentUser) {
          const baseUsername = profile?.login || profile?.name || user.email.split("@")[0]
          console.log(`=> Creating new user: ${baseUsername}`);

          await User.create({
            email: user.email,
            name: user.name,
            username: baseUsername.replace(/\s+/g, '').toLowerCase(),
            profilepic: user.image,
          })
        }
        return true
      } catch (error) {
        console.error("CRITICAL AUTH ERROR:", error.message);
        // Returning false tells NextAuth to DENY the sign-in
        // and redirect the user back to the login page with an error query param.
        return false
      }
    },
    async session({ session, token }) {
      try {
        await connectDb()
        const dbUser = await User.findOne({ email: session.user.email })
        if (dbUser) {
          session.user.username = dbUser.username
        }
      } catch (error) {
        console.error("Session Callback Error:", error.message)
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login', // Custom sign-in page
    error: '/login',  // Redirect to this page on error
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


export const authOptions = {
    adapter: PrismaAdapter(prisma)
    providers: [ CredentialsProvider({
    id: 'credentials',
    name: 'Credentials',
    credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) return null
    const user = await prisma.user.findUnique({ where: { email: credentials.email } })
    if (!user) return null
    // password stored in Account or a hashed field — you'll need to implement
    const account = await prisma.account.findFirst({ where: { userId: user.id } })
    // Example check (you should store hashed password somewhere safe)
    // if (!account) return null
    // const valid = await bcrypt.compare(credentials.password, account.refresh_token || '')
    // if(!valid) return null
    return { id: user.id, email: user.email, name: user.name }
    }
    })
    ],session: { strategy: 'jwt' },
    callbacks: {
    async session({ session, token }) {
    // attach role and id
    if (token) {
    // @ts-ignore
    session.user.id = token.sub
    // @ts-ignore
    session.user.role = token.role
    }
    return session
    },
    async jwt({ token, user }) {
    if (user) {
    // @ts-ignore
    token.role = user.role || 'HR'
    }
    return token
    }
    }
}
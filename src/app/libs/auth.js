import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "../../../utils/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcrypt";

const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/connexion",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" , placeholder: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if(!credentials.email || !credentials.password) {
                        return null
                    }

                    const existUser = await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    })

                    if(!existUser) {
                        return null
                    }

                    const isPasswordValid = await compare(credentials.password, existUser.password)

                    if(!isPasswordValid) {
                        return null
                    }

                    return {
                        id: existUser.id,
                        email: existUser.email
                    }
                } catch (e) {
                    throw new Error("Login failed: " + e.message);
                }
            }
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
    }
}

export default authOptions
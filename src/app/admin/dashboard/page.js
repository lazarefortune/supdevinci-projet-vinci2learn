import {getServerSession} from "next-auth";
import authOptions from "@/app/libs/auth";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)
    console.log(session)

    return (
        <div>
            Dashboard , welcome {session?.user.email}
        </div>
    )
}
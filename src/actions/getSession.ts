import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"

export const getSession = async () => {
    const session = await getServerSession(authOptions);
    return session
}
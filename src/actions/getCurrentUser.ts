import { getSession } from './getSession'
import prisma from '@/lib/prisma'

const getCurrentUser = async () => {
  
    const session = await getSession();

    if (!session?.user?.email) {
        return null
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    return currentUser;

}

export default getCurrentUser

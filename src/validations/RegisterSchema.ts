import { z } from 'zod'
export const RegisterSchema = z.object({
    name: z.string().min(4, 'Name must be at least 4 characters long'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})
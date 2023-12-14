import { z } from 'zod'

export const RentSchema = z.object({
    category: z.string().min(1, 'Category is required'),
    location: z.string().min(1, 'Location is required'),
    guestCount: z.number(),
    roomCount: z.number(),
    bathroomCount: z.number(),
    imageSrc: z.string().url('Image is required'),
    title: z.string(),
    description: z.string(),
    price: z.number().min(1, 'Price is required'),
})


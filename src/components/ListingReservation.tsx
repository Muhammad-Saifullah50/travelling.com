'use client'

import { Listing, Reservation, User } from "@prisma/client"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { Range } from "react-date-range"
import Calendar from "./Calendar"
import { Button } from "./ui/button"
import { TailSpin } from "react-loader-spinner"

interface ListingReservationProps {
    reservations?: Reservation[]
    currentUser: User
    listing: Listing
    initialDateRange: any
}
const ListingReservation = ({ reservations = [], currentUser, listing, initialDateRange }: ListingReservationProps) => {

    const router = useRouter();

    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [loading, setLoading] = useState(false);

    if (!currentUser) router.push('/login')



    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: Reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range]
        });

        return dates
    }, [reservations])


    const onCreateReservation = useCallback(async () => {
        try {
            setLoading(true)

            const result = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    totalPrice,
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    listingId: listing?.id
                })
            });

            const response = await result.json();

            if (result.status === 200) {
                toast.success('Listing reserved!')
                setDateRange(initialDateRange)
                router.refresh();
                router.push('/trips')
                router.refresh();

            }
            if (result.status !== 200) {
                toast.error(response.error)
            }
        } catch (error) {
            console.error(error);
            toast.error('Error reserving listing')
        } finally {
            setLoading(false)
        }
    }, [totalPrice, dateRange, listing?.id, router]);

    const onChangeDate = (value: Range) => {
        setDateRange(value)
    }

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price])
    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden h-fit">
            <div className="flex flex-row gap-1 p-4">
                <div className="text-2xl font-semibold">
                    $ {listing.price}
                </div>
                <div className="flex items-center font-light text-neutral-600">
                    <p>night</p>
                </div>
            </div>
            <hr />

            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value: any) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button
                    disabled={loading}
                    onClick={() => onCreateReservation()}
                    className="w-full"
                >{loading ? (
                    <TailSpin
                        height="20"
                        width="20"
                        color="#FFFFFF"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                ) : 'Reserve'}</Button>
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>Total</div><div>$ {totalPrice}</div>
            </div>
        </div>
    )
}

export default ListingReservation

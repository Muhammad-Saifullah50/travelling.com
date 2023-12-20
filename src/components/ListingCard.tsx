'use client'

import useCountries from "@/hooks/useCountries"
import { Listing, Reservation, User } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { format } from 'date-fns'
import Image from "next/image"
import HeartButton from "./HeartButton"
import { Button } from "./ui/button"
import toast from "react-hot-toast"
import clsx from "clsx"
import { TailSpin } from "react-loader-spinner"

interface ListingCardProps {
  currentUser?: User
  data: Listing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  secondaryActionLabel?: string
}
const ListingCard = ({ data, currentUser, reservation, onAction, disabled, actionLabel, secondaryActionLabel }: ListingCardProps) => {

  const router = useRouter();
  const pathname = usePathname();
  const { getByValue } = useCountries();
  const [loading, setLoading] = useState(false);

  const location = getByValue(data.locationValue);


  const handleDelete = async (id: string) => {
    try {
      setLoading(true);

      if (pathname === '/properties') {
        const result = await fetch('/api/listings', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        })
        const response = await result.json();
        if (response.status === 200) {
          toast.success('Listing deleted successfully');
          router.refresh();
        }
        if (response.status !== 200) {
          toast.error(response.error);
        }

      } else {
        const result = await fetch('/api/reservations', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ reservationId: id })
        })

        const response = await result.json();
        if (response.status === 200) {
          toast.success('Reservation cancelled');
          router.refresh();
        }
        if (response.status !== 200) {
          toast.error(response.error);
        }
      }


    } catch (error) {
      console.error(error, 'error')
      toast.error('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  const secondaryAction = async () => {
    router.push(`/edit-listing/${data.id}`)
  }

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation]);
  return (
    <div
      className="col-span-1 cursor-pointer group "
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt={data.title}
            className="object-cover h-full w-full group-hover:scale-110 transition"
            onClick={() => router.push(`/listings/${data.id}`)}
          />
          <div className="absolute top-3 right-3" >
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>

        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>

        {actionLabel && (pathname === '/trips' || pathname === '/reservations' || pathname === '/properties') && (
          <Button
            size={"sm"}
            disabled={loading}
            onClick={() => handleDelete(pathname === '/properties' ? data.id : reservation!.id)}
            className={clsx('flex gap-2', pathname === '/properties' && 'bg-red-500 hover:bg-red-600/70')}
          >
           {loading ? (
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
                ) : actionLabel}
          </Button>
        )}

        {secondaryActionLabel && (
          <Button
            size={"sm"}
            disabled={loading}
            onClick={() => secondaryAction()}
            className="flex gap-2"
          >
            {loading ? (
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
                ) : secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ListingCard

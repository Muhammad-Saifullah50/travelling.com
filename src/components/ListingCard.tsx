'use client'

import useCountries from "@/hooks/useCountries"
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { format } from 'date-fns'
import Image from "next/image"
import HeartButton from "./HeartButton"
import { Button } from "./ui/button"

interface ListingCardProps {
  currentUser?: any
  data: Listing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
}
const ListingCard = ({ data, currentUser, reservation, onAction, disabled, actionLabel, actionId }: ListingCardProps) => {

  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) return

    onAction?.(actionId!);
  }, [onAction, actionId, disabled]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null

    const start = new Date(reservation.startDate);
    const end = - new Date(reservation.endDate);

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

        {onAction && actionLabel && (
          <Button
            size={"sm"}
            disabled={disabled}
            onClick={handleCancel}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ListingCard

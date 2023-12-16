"use client"

import { useCallback } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { AiOutlinePlusCircle } from 'react-icons/ai'
interface CounterProps {
    title: string;
    subtitle?: string
    value: any
    onChange: (value: number) => void
}
const Counter = ({ title, subtitle, value, onChange }: CounterProps) => {

    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [value, onChange]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return
        }
        //@ts-ignore
        onChange(value - 1)
    }, [value, onChange])
    return (
        <div className="flex justify-between  border-b-2  py-3">
            <div className="flex flex-col gap-2">
                <h4 className="text-lg font-semibold">{title}</h4>
                <p className="text-gray-500">{subtitle}</p>
            </div>
            <div className=" flex gap-3 items-center justify-center">
                <AiOutlineMinusCircle
                    className='text-gray-400 hover:text-gray-600'
                    size={30}
                    onClick={onReduce}
                />
                <span className='text-gray-600'>{value}</span>
                <AiOutlinePlusCircle
                    className='text-gray-400  hover:text-gray-600'
                    size={30}
                    onClick={onAdd}
                />
            </div>
        </div>
    )
}

export default Counter

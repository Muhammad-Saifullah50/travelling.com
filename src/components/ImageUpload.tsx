"use client"

import { useCallback } from "react";
import { CldUploadWidget } from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'
import Image from "next/image";
interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string
    isEdit?: boolean
}

const ImageUpload = ({ onChange, value, isEdit }: ImageUploadProps) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])
    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            options={{
                maxFiles: 1,
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="mt-2 relative cursor-pointer hover:opacity-70 transition border-2 border-dashed  border-neutral-300 text-neutral-600 items-center justify-center flex flex-col gap-4 h-full"
                    >
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={value}
                                    alt="upload"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload

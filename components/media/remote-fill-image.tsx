"use client"

import Image from "next/image"
import { useState } from "react"
import { ImageOff } from "lucide-react"
import { cn } from "@/lib/utils"

type RemoteFillImageProps = {
  src: string
  alt: string
  className?: string
  sizes: string
  priority?: boolean
}

/**
 * Remote image with a dark, on-brand fallback if the URL fails (network, 404, hotlink limits).
 */
export function RemoteFillImage({ src, alt, className, sizes, priority }: RemoteFillImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#060607] px-4 text-center",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="size-8 shrink-0 text-muted-foreground/70" aria-hidden />
        <p className="max-w-[14rem] text-xs leading-relaxed text-muted-foreground">
          Image could not be loaded. Use the official source links beside this entry.
        </p>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized
      onError={() => setFailed(true)}
    />
  )
}

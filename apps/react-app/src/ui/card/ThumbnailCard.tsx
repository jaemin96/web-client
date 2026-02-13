import * as React from "react"
import { Image } from "lucide-react"
import { cn } from "../../lib/utils"
import { Card } from "./Card"

interface ThumbnailCardProps {
  thumbnail?: string
  title: string
  selected?: boolean
  onClick?: () => void
  enableScroll?: boolean
  showNoImageIcon?: boolean
  className?: string
}

const ThumbnailCard = React.forwardRef<HTMLDivElement, ThumbnailCardProps>(
  ({ thumbnail, title, selected = false, onClick, enableScroll = true, showNoImageIcon = false, className }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "group flex flex-col items-center cursor-pointer w-[calc(33.333%-0.5rem)] m-1 text-center min-h-fit p-0 gap-0 shadow-none rounded-none",
          selected && "border-primary border-2",
          className
        )}
        onClick={onClick}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full max-h-[150px] min-h-[150px] object-cover border-b border-gray-200"
          />
        ) : (
          <div className="w-full max-h-[150px] min-h-[150px] bg-[#fafafa] flex items-center justify-center border-b border-gray-200">
            {showNoImageIcon && (
              <Image className="w-10 h-10 text-black/[0.08]" />
            )}
          </div>
        )}
        <div
          className={cn(
            "w-full px-2 pr-[0.3rem] pl-2 py-2 text-[0.85rem] break-words text-center",
            enableScroll && "max-h-[60px] overflow-y-auto",
            enableScroll && [
              "[&::-webkit-scrollbar]:w-1",
              "[&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:rounded-sm",
              "group-hover:[&::-webkit-scrollbar-thumb]:bg-black/20",
              "group-hover:[&::-webkit-scrollbar-thumb]:hover:bg-black/30"
            ]
          )}
        >
          {title}
        </div>
      </Card>
    )
  }
)
ThumbnailCard.displayName = "ThumbnailCard"

export { ThumbnailCard }
export type { ThumbnailCardProps }

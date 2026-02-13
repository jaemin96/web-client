import * as React from "react"
import { cn } from "../../lib/utils"
import { ThumbnailCard } from "./ThumbnailCard"

interface ThumbnailCardGridProps {
  items: Array<{
    id: string | number
    thumbnail?: string
    title: string
  }>
  selectedId?: string | number
  onItemClick?: (id: string | number) => void
  enableScroll?: boolean
  showNoImageIcon?: boolean
  className?: string
}

const ThumbnailCardGrid = React.forwardRef<HTMLDivElement, ThumbnailCardGridProps>(
  ({ items, selectedId, onItemClick, enableScroll = true, showNoImageIcon = false, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-wrap items-stretch p-2", className)}>
        {items.map((item) => (
          <ThumbnailCard
            key={item.id}
            thumbnail={item.thumbnail}
            title={item.title}
            selected={selectedId === item.id}
            onClick={() => onItemClick?.(item.id)}
            enableScroll={enableScroll}
            showNoImageIcon={showNoImageIcon}
          />
        ))}
      </div>
    )
  }
)
ThumbnailCardGrid.displayName = "ThumbnailCardGrid"

export { ThumbnailCardGrid }
export type { ThumbnailCardGridProps }

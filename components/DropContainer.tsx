import { cn } from '@/lib/utils'
export default function DropContainer({
  children,
  className,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'w-40 h-40 border border-dashed flex items-center justify-center text-gray-500 text-sm border-gray-300',
        className,
      )}
    >
      {children ? children : 'Drop Here'}
    </div>
  )
}

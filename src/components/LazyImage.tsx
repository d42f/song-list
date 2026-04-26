import { useLazyImage } from '../hooks/useLazyImage'

interface Props {
  className?: string
  src: string
  alt: string
}

export function LazyImage({ className, src, alt }: Props) {
  const [ref, isVisible] = useLazyImage<HTMLImageElement>()
  return <img className={className} ref={ref} src={isVisible ? src : undefined} alt={alt} />
}

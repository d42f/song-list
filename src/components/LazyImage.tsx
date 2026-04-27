import { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface Props {
  className?: string
  src: string
  alt: string
}

export function LazyImage({ className, src, alt }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useIntersectionObserver<HTMLImageElement>(() => setIsVisible(true), !isVisible)
  return <img className={className} ref={ref} src={isVisible ? src : undefined} alt={alt} />
}

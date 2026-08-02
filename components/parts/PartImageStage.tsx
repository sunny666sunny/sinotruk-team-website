import { SiteImage } from '@/components/SiteImage'

type PartImageStageProps = {
  src: string
  alt: string
  priority?: boolean
  className?: string
  sizes?: string
  imageClassName?: string
}

export function PartImageStage({ src, alt, priority = false, className = '', imageClassName = '', sizes = '(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw' }: PartImageStageProps) {
  return <div className={`relative flex items-center justify-center overflow-hidden border border-[#d6dcda] bg-[#F3F5F2] ${className}`}>
    <SiteImage src={src} alt={alt} fill priority={priority} sizes={sizes} className={`object-contain p-5 transition duration-300 group-hover:scale-[1.03] sm:p-8 ${imageClassName}`} />
  </div>
}

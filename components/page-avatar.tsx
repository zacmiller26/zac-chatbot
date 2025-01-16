import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function PageAvatar(props: CommonProps) {
  return (
    <div className={cn('relative h-28 w-28 rounded-full', props.className)}>
      <Image
        fill
        src='/avatar.jpg?v=3'
        sizes='(max-width: 768px) 32'
        alt='Picture of Zac'
        className='rounded-full object-cover object-center'
      />
    </div>
  )
}

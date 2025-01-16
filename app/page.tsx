import Chat from '@/components/chat'
import PageAvatar from '@/components/page-avatar'
import PageDescription from '@/components/page-description'
import PageLinks from '@/components/page-links'
import PageTitle from '@/components/page-title'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <div className='boder flex h-[100dvh] flex-col font-[family-name:var(--font-geist-sans)]'>
      <div className='flex h-full flex-col items-center justify-center gap-6 px-2 pt-4 md:gap-8 md:px-6 md:pt-12'>
        <div className='flex flex-col items-center gap-1'>
          <div className='pb-2'>
            <PageAvatar />
          </div>
          <PageTitle />
          <PageDescription />
          <div className='pt-2'>
            <PageLinks />
          </div>
        </div>

        <main
          className={cn(
            'relative w-full min-w-80 flex-1 overflow-hidden pb-2 lg:w-[620px]'
          )}
        >
          <Chat />
        </main>

        <footer className=''>{/* TODO: Drawer Button */}</footer>
      </div>
    </div>
  )
}

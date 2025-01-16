import Chat from '@/components/chat'
import PageAvatar from '@/components/page-avatar'
import PageDescription from '@/components/page-description'
import PageLinks from '@/components/page-links'
import PageTitle from '@/components/page-title'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <div className='boder flex h-[100dvh] flex-col font-[family-name:var(--font-geist-sans)]'>
      <div className='flex h-full flex-col items-center justify-center gap-8 px-6 pt-12'>
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
            'border-background-1 relative w-full min-w-80 flex-1 overflow-scroll rounded-md border p-3 lg:w-[620px] lg:p-8'
          )}
        >
          <Chat />
        </main>

        <footer className='flex gap-6 py-3 sm:pb-8'></footer>
      </div>
    </div>
  )
}

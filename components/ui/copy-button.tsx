'use client'

import useCopyToClipboard from '@/hooks/useCopyToClipboard'
import { cn } from '@/lib/utils'
import { FiCopy } from 'react-icons/fi'
import { toast } from 'sonner'

export default function CopyButton({
  copyText,
  ...props
}: CommonProps<{ copyText: string }>) {
  const [_, copyToClipboard] = useCopyToClipboard()

  return (
    <button
      className={cn(props.className)}
      onClick={async () => {
        await copyToClipboard(copyText as string)
        toast.success('Copied to clipboard!')
      }}
    >
      {props.children ?? <FiCopy className='h-3 w-3' />}
    </button>
  )
}

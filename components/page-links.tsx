'use client'

import useCopyToClipboard from '@/hooks/useCopyToClipboard'
import { EMAIL_ENCODED, FIRST_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { toast } from 'sonner'

const links = [
  {
    href: 'https://linkedin.com/in/zac-miller/',
    label: 'Linkedin',
    icon: FaLinkedin
  },
  {
    href: 'https://github.com/zacmiller26',
    label: 'Github',
    icon: FaGithub
  },
  {
    href: 'https://instagram.com/zacmiller26',
    label: 'Instagram',
    icon: FaInstagram
  }
]

const buttonClassName = cn(
  'bg-accent-1 flex items-center gap-2 rounded-full p-2 font-mono text-xs font-semibold text-background',
  'lg:px-3 lg:py-1',
  'md:hover:bg-accent'
)

const iconClassName = 'h-6 w-6 lg:h-3 lg:w-3'

export default function PageLinks() {
  return (
    <div className='flex items-center gap-2.5'>
      {links.map(link => {
        const Icon = link.icon

        return (
          <Link
            key={link.label}
            href={link.href}
            className={buttonClassName}
            target='_blank'
          >
            <Icon className={iconClassName} />
            <HideIfSmallScreen>{link.label}</HideIfSmallScreen>
          </Link>
        )
      })}
      <EmailAddressButton />
    </div>
  )
}

function HideIfSmallScreen({ children }: CommonProps) {
  return <span className='hidden lg:inline-block'>{children}</span>
}

function EmailAddressButton() {
  const [_, copyToClipboard] = useCopyToClipboard()

  const handleClick = async () => {
    const email = atob(EMAIL_ENCODED)
    await copyToClipboard(email)
    toast.success(`${FIRST_NAME}'s email address was copied!`)
  }

  return (
    <button className={buttonClassName} onClick={handleClick}>
      <FaEnvelope className='h-6 w-6 lg:h-3 lg:w-3' />
      <HideIfSmallScreen>Email</HideIfSmallScreen>
    </button>
  )
}

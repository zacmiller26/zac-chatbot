import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

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
  },
  {
    href: '/',
    label: 'Email',
    icon: FaEnvelope
  }
]

export default function PageLinks() {
  return (
    <div className='flex items-center gap-2.5'>
      {links.map(link => {
        const Icon = link.icon

        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              'bg-accent flex items-center gap-2 rounded-full p-2 font-mono text-xs font-semibold text-background',
              'lg:px-3 lg:py-1',
              'md:hover:bg-accent-1'
            )}
            target='_blank'
          >
            <Icon className='h-6 w-6 lg:h-3 lg:w-3' />
            <span className='hidden lg:inline-block'>{link.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

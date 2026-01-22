import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Jason O\'Neal for cybersecurity projects, development collaborations, or general inquiries.  Available worldwide for remote work.',
  openGraph: {
    title: 'Contact | BlueDot IT',
    description: 'Get in touch for projects and collaborations',
    type: 'website',
  }
}

export default function ContactLayout({ children }: { children: React. ReactNode }) {
  return children
}
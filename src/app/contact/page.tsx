import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Jason O\'Neal for cybersecurity projects, development collaborations, or general inquiries. Available worldwide for remote work.',
  openGraph: {
    title: 'Contact | BlueDot IT',
    description: 'Get in touch for projects and collaborations',
    type: 'website',
    url: 'https://bluedot.it.com/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | BlueDot IT',
    description: 'Get in touch for projects and collaborations',
  },
}

export default function ContactPage() {
  return <ContactForm />
}
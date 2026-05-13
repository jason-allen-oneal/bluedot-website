import { metadataForServicePage, renderServicePage } from '@/components/services/ServiceLandingPage'

export const metadata = metadataForServicePage('nextjs-security-hardening')

export default function ServicePage() {
  return renderServicePage('nextjs-security-hardening')
}

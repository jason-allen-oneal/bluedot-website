import { metadataForServicePage, renderServicePage } from '@/components/services/ServiceLandingPage'

export const metadata = metadataForServicePage('server-hardening')

export default function ServicePage() {
  return renderServicePage('server-hardening')
}

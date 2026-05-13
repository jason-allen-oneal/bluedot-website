import { metadataForServicePage, renderServicePage } from '@/components/services/ServiceLandingPage'

export const metadata = metadataForServicePage('security-reviews')

export default function ServicePage() {
  return renderServicePage('security-reviews')
}

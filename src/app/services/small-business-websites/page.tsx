import { metadataForServicePage, renderServicePage } from '@/components/services/ServiceLandingPage'

export const metadata = metadataForServicePage('small-business-websites')

export default function ServicePage() {
  return renderServicePage('small-business-websites')
}

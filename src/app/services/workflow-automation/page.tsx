import { metadataForServicePage, renderServicePage } from '@/components/services/ServiceLandingPage'

export const metadata = metadataForServicePage('workflow-automation')

export default function ServicePage() {
  return renderServicePage('workflow-automation')
}

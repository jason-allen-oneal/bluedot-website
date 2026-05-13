import { metadataForServicePage, renderServicePage } from '@/components/services/ServiceLandingPage'

export const metadata = metadataForServicePage('ai-security-tooling')

export default function ServicePage() {
  return renderServicePage('ai-security-tooling')
}

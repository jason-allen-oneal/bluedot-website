import Hero from '@/components/Hero';
import PersonaGrid from '@/components/PersonaGrid';
import CaseHighlights from '@/components/CaseHighlights';

export const dynamic = 'force-dynamic';

export default function Landing() {
    return (
        <main>
            <Hero />
            <PersonaGrid />
            <CaseHighlights />
        </main>
    );
}

import Hero from '@/components/Hero';

export const dynamic = 'force-dynamic'; // SSR always

export default function Landing() {
    return (
        <section>
            <Hero />
        </section>
    );
}
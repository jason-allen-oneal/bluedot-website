export default function Footer(){
    return (
        <footer className="mt-auto z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/50 border-t border-neutral-800/70 py-8 text-sm text-neutral-500">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
                <p>© {new Date().getFullYear()} Jason O’Neal. Built with Next.js.</p>
                <p className="text-neutral-500">Signal • GitHub • LinkedIn</p>
            </div>
        </footer>
    );
}
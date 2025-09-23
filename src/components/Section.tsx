export default function Section({ title, subtitle, children }:{ title:string; subtitle?:string; children:React.ReactNode }){
    return (
        <section className="relative">
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
                {subtitle && <p className="text-neutral-400 mt-1">{subtitle}</p>}
            </div>
            {children}
        </section>
    );
}
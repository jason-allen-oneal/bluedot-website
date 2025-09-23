import BlueDot from "./BlueDot";

export default function Contact() {
    return (
      <section id="contact" className="relative mx-auto max-w-[1100px] px-6 py-16">
        {/* Decorative blue dots */}
        <div className="absolute top-6 right-8 opacity-25">
          <BlueDot size="lg" animated />
        </div>
        <div className="absolute bottom-12 left-10 opacity-20">
          <BlueDot size="md" />
        </div>
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-2">Let’s build something secure.</h2>
          <p className="text-sm text-muted mb-4">
            Reach out for contracts, collabs, or speaking. I answer quickly.
          </p>
          <div className="flex flex-wrap gap-3">
            <a className="rounded-md border border-border px-4 py-2 hover:bg-surface" href="mailto:jason.allen.oneal@gmail.com">
              jason.allen.oneal@gmail.com
            </a>
            <a className="rounded-md border border-border px-4 py-2 hover:bg-surface" href="https://github.com/jason-allen-oneal" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </section>
    );
  }
  
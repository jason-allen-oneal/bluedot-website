// components/Background.tsx
export default function Background() {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(1200px_600px_at_50%_-10%,#000_40%,transparent_75%)]">
        {/* Aurora blobs (cheap GPU gradients) */}
        <div className="aurora -top-32 left-[-10%] size-[70vmax]" />
        <div className="aurora top-[-20%] right-[-15%] size-[60vmax] delay-100" />
        <div className="aurora bottom-[-35%] left-[15%] size-[65vmax] delay-200" />
  
        {/* Subtle grid overlay */}
        <div className="bg-grid absolute inset-0 opacity-[.22]" />
      </div>
    );
  }
  
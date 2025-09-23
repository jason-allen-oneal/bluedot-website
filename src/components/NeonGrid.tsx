"use client";
import { useEffect, useRef } from "react";


export default function NeonGrid(){
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current!;
        el.style.backgroundSize = "32px 32px";
    }, []);
    return (
        <div
            ref={ref}
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-40"
            style={{
                backgroundImage: `radial-gradient(circle, rgba(31,140,255,.18) 1px, transparent 1px)`,
                maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
            }}
        />
    );
}
"use client";
import * as React from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useRouter } from "next/navigation";


export default function CommandMenu(){
    const [open, setOpen] = React.useState(false);
    const router = useRouter();


    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey))) {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);


    const go = (path: string) => () => { setOpen(false); router.push(path); };


    return (
        <>
            <button onClick={() => setOpen(true)} className="rounded-xl border border-neutral-800 px-3 py-1.5 text-sm text-neutral-300 hover:text-white hover:border-neutral-700">Search ⌘K</button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Jump to…" />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Navigate">
                        <CommandItem onSelect={go("/")}>Home</CommandItem>
                        <CommandItem onSelect={go("/projects")}>Projects</CommandItem>
                        <CommandItem onSelect={go("/writing")}>Writing</CommandItem>
                        <CommandItem onSelect={go("/about")}>About</CommandItem>
                        <CommandItem onSelect={go("/contact")}>Contact</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
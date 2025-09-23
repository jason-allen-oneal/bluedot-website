"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects";

type TerminalEntry = {
    id: number;
    content: React.ReactNode;
};

const USERNAME = "guest";
const HOSTNAME = "bluedot";

export default function TerminalConsole() {
    const [entries, setEntries] = useState<TerminalEntry[]>([]);
    const [command, setCommand] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [cwd, setCwd] = useState<string>("~");
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const didInitialAutoScrollRef = useRef<boolean>(false);
    const router = useRouter();

    const nextId = useRef<number>(1);

    const focusInput = useCallback(() => {
        const el = inputRef.current as unknown as { focus: (opts?: any) => void } | null;
        // PreventScroll avoids the page jumping down to the input on mount
        el?.focus?.({ preventScroll: true });
    }, []);

    useEffect(() => {
        // Initial banner
        const banner: TerminalEntry[] = [
            { id: nextId.current++, content: <span className="text-neutral-500">Welcome to <span className="text-blue-400">bluedot.it.com</span>. Type <span className="text-neutral-200">help</span> to get started.</span> },
        ];
        setEntries(banner);
         
    }, []);

    // Focus input on first user keypress, without scrolling the page
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            // ignore when typing in inputs/textareas or composing
            const target = e.target as HTMLElement | null;
            const tag = target?.tagName?.toLowerCase();
            if (tag === "input" || tag === "textarea" || (e as any).isComposing) return;
            // printable keys or Backspace
            if (e.key.length === 1 || e.key === "Backspace") {
                e.preventDefault();
                focusInput();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [focusInput]);

    useEffect(() => {
        if (!didInitialAutoScrollRef.current) {
            didInitialAutoScrollRef.current = true;
            return; // skip auto-scroll on first render (banner)
        }
        const scroller = scrollAreaRef.current;
        if (scroller) {
            scroller.scrollTop = scroller.scrollHeight;
        }
    }, [entries.length]);

    // Keep prompt visible as user types (emulates terminal cursor moving down)
    useEffect(() => {
        const scroller = scrollAreaRef.current;
        if (scroller) {
            scroller.scrollTop = scroller.scrollHeight;
        }
    }, [command]);

    const helpContent = useMemo<React.ReactNode[]>(() => (
        [
            <span key="h0" className="text-neutral-200">Available commands:</span>,
            <span key="h1"><span className="text-green-400">help</span>                <span className="text-neutral-400">Show this help</span></span>,
            <span key="h2"><span className="text-green-400">about</span>               <span className="text-neutral-400">Who I am and what I do</span></span>,
            <span key="h3"><span className="text-green-400">projects</span>            <span className="text-neutral-400">List featured projects</span></span>,
            <span key="h4"><span className="text-green-400">blog</span>                <span className="text-neutral-400">Open blog</span></span>,
            <span key="h5"><span className="text-green-400">contact</span>             <span className="text-neutral-400">Open contact</span></span>,
            <span key="h6"><span className="text-green-400">ls</span>                  <span className="text-neutral-400">List directory (supports ~ and ~/projects)</span></span>,
            <span key="h7"><span className="text-green-400">cd</span> <span className="text-blue-400">&lt;dir&gt;</span>           <span className="text-neutral-400">Change directory</span></span>,
            <span key="h8"><span className="text-green-400">pwd</span>                 <span className="text-neutral-400">Print working directory</span></span>,
            <span key="h9"><span className="text-green-400">whoami</span>              <span className="text-neutral-400">Print current user</span></span>,
            <span key="h10"><span className="text-green-400">date</span>                <span className="text-neutral-400">Print current date</span></span>,
            <span key="h11"><span className="text-green-400">echo</span> <span className="text-blue-400">&lt;text&gt;</span>         <span className="text-neutral-400">Print text</span></span>,
            <span key="h12"><span className="text-green-400">clear</span>               <span className="text-neutral-400">Clear the screen</span></span>,
        ]
    ), []);

    const aboutContent = (
        <div className="space-y-2">
            <div>
                Cybersecurity engineer • Software builder • I design resilient systems and craft tooling for red/blue teams.
            </div>
            <div className="space-x-2">
                <Link className="underline underline-offset-4" href="/about">/about</Link>
                <span>·</span>
                <Link className="underline underline-offset-4" href="/projects">/projects</Link>
            </div>
        </div>
    );

    const listProjects = () => projects.map(p => (
        <span key={p.slug}>
            <span className="text-neutral-500">-</span> <span className="text-neutral-200">{p.title}</span>{p.slug ? <span className="text-neutral-500"> ({p.slug})</span> : null}
        </span>
    ));

    const Line: React.FC<{ children: React.ReactNode }>
        = ({ children }) => <div className="whitespace-pre-wrap">{children}</div>;

    const write = (node: React.ReactNode) => {
        setEntries((prev) => [...prev, { id: nextId.current++, content: node }]);
    };

    const writeLines = (lines: string[] | React.ReactNode[]) => {
        for (const l of lines) write(<Line>{l}</Line>);
    };

    const renderPrompt = (path: string) => (
        <>
            <span className="text-green-400">{USERNAME}</span>
            <span className="text-neutral-500">@</span>
            <span className="text-cyan-400">{HOSTNAME}</span>
            <span className="text-neutral-500">:</span>
            <span className="text-blue-400">{path}</span>
            <span className="text-neutral-500">$</span>
        </>
    );

    // Simple virtual FS map
    const fs = useMemo(() => ({
        "~": { type: "dir", children: { "projects": "dir", "about.txt": "file", "contact.txt": "file" } as Record<string, "dir"|"file"> },
        "~/projects": { type: "dir", children: Object.fromEntries(projects.map(p => [p.slug, "file"])) as Record<string, "dir"|"file"> },
    }), []);

    const normalizePath = (inputPath: string): string | null => {
        if (!inputPath || inputPath === "~") return "~";
        if (inputPath === ".") return cwd;
        if (inputPath === "..") {
            if (cwd === "~") return "~";
            return "~"; // only one level supported
        }
        let next = inputPath.startsWith("~") ? inputPath : (inputPath.startsWith("/") ? "~" + inputPath : `${cwd}/${inputPath}`);
        // collapse duplicates
        if (next.endsWith("/")) next = next.slice(0, -1);
        // Only support ~ and ~/projects
        if (next === "~" || next === "~/projects") return next;
        return null;
    };

    const runCommand = (raw: string) => {
        const input = raw.trim();
        if (!input) return;

        // Echo command with prompt
        write(<Line><span className="select-none">{renderPrompt(cwd)}</span> <span className="text-neutral-100">{input}</span></Line>);

        const [cmd, ...rest] = input.split(/\s+/);
        const arg = rest.join(" ").toLowerCase();

        switch (cmd.toLowerCase()) {
            case "help":
                writeLines(helpContent);
                break;
            case "about":
                write(aboutContent);
                break;
            case "projects":
                writeLines(listProjects());
                break;
            case "blog":
                write(<Line>Opening /blog …</Line>);
                break;
            case "contact":
                write(<Line>Opening /contact …</Line>);
                break;
            case "ls": {
                const dir = fs[cwd as keyof typeof fs];
                if (dir?.type === "dir") {
                    const nodes = Object.entries(dir.children).map(([name, kind]) => (
                        <span key={name} className={kind === "dir" ? "text-blue-400" : "text-neutral-200"}>{name}</span>
                    ));
                    writeLines(nodes);
                } else {
                    write(<Line>No such directory</Line>);
                }
                break;
            }
            case "pwd":
                write(<Line>{cwd === "~" ? "/home/guest" : "/home/guest/projects"}</Line>);
                break;
            case "whoami":
                write(<Line>{USERNAME}</Line>);
                break;
            case "date":
                write(<Line>{new Date().toString()}</Line>);
                break;
            case "echo":
                write(<Line>{(rest.join(" "))}</Line>);
                break;
            case "cd": {
                const target = rest.join(" ") || "~";
                const resolved = normalizePath(target);
                if (resolved && fs[resolved as keyof typeof fs]?.type === "dir") {
                    setCwd(resolved);
                } else {
                    write(<Line>cd: no such file or directory: {target}</Line>);
                }
                break;
            }
            case "open": {
                const target = arg || "";
                if (["about", "projects", "blog", "contact"].includes(target)) {
                    const path = `/${target}`;
                    write(<Line>Navigating to <span className="text-blue-400">{path}</span> …</Line>);
                    router.push(path);
                } else if (target.startsWith("http")) {
                    write(<Line>Opening <span className="text-blue-400">{target}</span> …</Line>);
                } else {
                    write(<Line>Unknown target. Try: open about | projects | blog</Line>);
                }
                break;
            }
            case "clear":
                setEntries([]);
                break;
            default:
                write(<Line>Command not found: {cmd}. Try help.</Line>);
        }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const current = command;
            setHistory((prev) => (current ? [current, ...prev] : prev));
            setHistoryIndex(-1);
            runCommand(current);
            setCommand("");
            return;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const next = historyIndex + 1;
            if (next < history.length) {
                setHistoryIndex(next);
                setCommand(history[next]);
            }
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = historyIndex - 1;
            if (next >= 0) {
                setHistoryIndex(next);
                setCommand(history[next]);
            } else {
                setHistoryIndex(-1);
                setCommand("");
            }
        }
    };

    return (
        <div className="h-full min-h-0" onClick={focusInput}>
            <div className="mx-auto max-w-3xl h-full min-h-0 px-4 py-8">
                <div className="flex h-full min-h-[300px] flex-col rounded-lg border border-neutral-800 bg-neutral-950/80 shadow-xl">
                    {/* window bar */}
                    <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2">
                        <div className="flex gap-2">
                            <span className="h-3 w-3 rounded-full bg-red-500/80" />
                            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                            <span className="h-3 w-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="text-xs text-neutral-500">bluedot console</div>
                    </div>

                    {/* scrollable terminal content */}
                    <div ref={scrollAreaRef} className="flex-1 min-h-0 overflow-y-auto font-mono text-sm leading-relaxed px-4 py-4">
                        <div className="space-y-2">
                            {entries.map((e) => (
                                <div key={e.id}>{e.content}</div>
                            ))}
                        </div>
                        {/* live prompt inside scroll area */}
                        <div className="mt-2 flex items-center gap-2">
                            <span className="select-none">{renderPrompt(cwd)}</span>
                            <input
                                ref={inputRef}
                                value={command}
                                onChange={(ev) => setCommand(ev.target.value)}
                                onKeyDown={onKeyDown}
                                className="flex-1 bg-transparent outline-none placeholder:text-neutral-600"
                                placeholder="type a command… (help)"
                                aria-label="terminal input"
                                autoCapitalize="none"
                                autoCorrect="off"
                                spellCheck={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



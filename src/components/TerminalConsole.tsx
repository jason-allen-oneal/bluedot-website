"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type TerminalEntry = {
    id: number;
    content: React.ReactNode;
};

const USERNAME = "guest";
const HOSTNAME = "bluedot";

interface TerminalConsoleProps {
  windowState?: 'normal' | 'minimized' | 'maximized';
  onStateChange?: (state: 'normal' | 'minimized' | 'maximized') => void;
  onPositionChange?: (position: { x: number; y: number }) => void;
  onSizeChange?: (size: { width: number; height: number }) => void;
}

export default function TerminalConsole({ 
  windowState = 'normal',
  onStateChange,
  onPositionChange,
  onSizeChange 
}: TerminalConsoleProps) {
    const [entries, setEntries] = useState<TerminalEntry[]>([]);
    const [command, setCommand] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [cwd, setCwd] = useState<string>("~");
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isClosed, setIsClosed] = useState<boolean>(false);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <span key="h1b"><span className="text-green-400">projects</span> <span className="text-blue-400">[n]</span>       <span className="text-neutral-400">List top GitHub repos</span></span>,
            <span key="h2"><span className="text-green-400">open</span> <span className="text-blue-400">&lt;target&gt;</span>       <span className="text-neutral-400">Open about, contact, projects, or blog</span></span>,
            <span key="h3"><span className="text-green-400">ls</span>                  <span className="text-neutral-400">List directory contents</span></span>,
            <span key="h4"><span className="text-green-400">cd</span> <span className="text-blue-400">&lt;dir&gt;</span>           <span className="text-neutral-400">Change directory</span></span>,
            <span key="h5"><span className="text-green-400">pwd</span>                 <span className="text-neutral-400">Print working directory</span></span>,
            <span key="h6"><span className="text-green-400">whoami</span>              <span className="text-neutral-400">Print current user</span></span>,
            <span key="h7"><span className="text-green-400">date</span>                <span className="text-neutral-400">Print current date</span></span>,
            <span key="h8"><span className="text-green-400">echo</span> <span className="text-blue-400">&lt;text&gt;</span>         <span className="text-neutral-400">Print text</span></span>,
            <span key="h9"><span className="text-green-400">clear</span>               <span className="text-neutral-400">Clear the screen</span></span>,
            <span key="h10"><span className="text-green-400">cat</span> <span className="text-blue-400">&lt;file&gt;</span>          <span className="text-neutral-400">Display file contents</span></span>,
            <span key="h11"><span className="text-green-400">grep</span> <span className="text-blue-400">&lt;pattern&gt;</span>      <span className="text-neutral-400">Search for pattern (simulated)</span></span>,
            <span key="h12"><span className="text-green-400">ps</span>                  <span className="text-neutral-400">Show running processes</span></span>,
            <span key="h13"><span className="text-green-400">top</span>                 <span className="text-neutral-400">Display system info</span></span>,
            <span key="h14"><span className="text-green-400">history</span>             <span className="text-neutral-400">Show command history</span></span>,
            <span key="h15"><span className="text-green-400">uname</span>               <span className="text-neutral-400">System information</span></span>,
        ]
    ), []);

    const aboutContent = (
        <div className="space-y-2">
            <div>
                <b>Jason O’Neal</b><br></br>
                <span className="text-green-400">Cybersecurity Student (IoT)</span> • <span className="text-cyan-400">Full-Stack Developer</span> • <span className="text-blue-400">AI/LLM Developer</span><br></br>
                I’m a cybersecurity student specializing in IoT and a full-stack developer who builds resilient web applications. I work with Python 3, TypeScript, and JavaScript to design secure systems and craft custom tooling for red and blue teams. My interests also extend into artificial intelligence — exploring large language models with Ollama, LM Studio, PyTorch, and advanced prompting techniques. I enjoy bridging security, software, and AI to create practical, forward-thinking solutions.
            </div>
            <div className="space-x-2">
                <Link className="underline underline-offset-4" href="/projects">/projects</Link>
            </div>
        </div>
    );

    // Fetch and list GitHub repositories inside the console
    async function listProjectsFromGitHub(limit = 6) {
        try {
            const res = await fetch("https://api.github.com/users/jason-allen-oneal/repos?per_page=100", { headers: { Accept: "application/vnd.github.v3+json" } });
            if (!res.ok) {
                write(<Line>projects: failed to fetch ({res.status})</Line>);
                return;
            }
            const data = await res.json();
            const filtered = (data || []).filter((r: any) => !r.fork && !r.private);
            filtered.sort((a: any, b: any) => {
                if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            });
            const top = filtered.slice(0, Math.max(1, Math.min(50, limit)));
            write(<Line><span className="text-neutral-300">Top repositories:</span></Line>);
            top.forEach((r: any) => {
                write(
                    <Line>
                        <span className="text-blue-400">{r.name}</span>
                        <span className="text-neutral-500"> — </span>
                        <span className="text-neutral-300">{r.description || "No description"}</span>
                        <span className="text-neutral-500"> · </span>
                        <span className="text-yellow-300">★ {r.stargazers_count}</span>
                        <span className="text-neutral-500"> · </span>
                        <a className="underline underline-offset-4" href={r.html_url} target="_blank" rel="noreferrer">repo</a>
                    </Line>
                );
            });
        } catch (err) {
            write(<Line>projects: network error</Line>);
        }
    }

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
        "~/projects": { type: "dir", children: {} as Record<string, "dir"|"file"> },
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

    async function tryGeminiCommand(fullCommand: string): Promise<boolean> {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 6000);
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: fullCommand }),
                signal: controller.signal,
            });
            clearTimeout(timeout);
            if (!res.ok) return false;
            const data = await res.json();
            const text: string = data?.response || "";
            if (!text) return false;
            const cleaned = text
                .replace(/^```[a-zA-Z]*\n?/, "")
                .replace(/\n?```\s*$/, "")
                .trimEnd();
            cleaned.split(/\r?\n/).forEach((line) => write(<Line>{line}</Line>));
            return true;
        } catch {
            return false;
        }
    }

    const runCommand = async (raw: string) => {
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
            case "projects": {
                const nRaw = rest[0];
                const n = nRaw ? parseInt(nRaw) : 6;
                listProjectsFromGitHub(Number.isFinite(n) && n > 0 ? n : 6);
                break;
            }
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
                } else {
                    write(<Line>Usage: open &lt;target&gt;</Line>);
                    write(<Line>Available targets: about, projects, blog, contact</Line>);
                }
                break;
            }
            case "cat": {
                const filename = rest.join(" ");
                if (!filename) {
                    write(<Line>cat: missing file operand</Line>);
                } else if (filename === "about.txt") {
                    write(aboutContent);
                } else if (filename === "contact.txt") {
                    write(<Line>Email: jason.allen.oneal@gmail.com</Line>);
                    write(<Line>LinkedIn: /in/jasonallenoneal</Line>);
                    write(<Line>GitHub: github.com/jason-allen-oneal</Line>);
                } else {
                    write(<Line>cat: {filename}: No such file or directory</Line>);
                }
                break;
            }
            case "grep": {
                const pattern = rest.join(" ");
                if (!pattern) {
                    write(<Line>grep: missing search pattern</Line>);
                } else {
                    write(<Line>grep: searching for "{pattern}" in current directory...</Line>);
                    write(<Line>about.txt: Found matches in personal information</Line>);
                    write(<Line>Use 'cat about.txt' to read full content</Line>);
                }
                break;
            }
            case "ps": {
                const success = await tryGeminiCommand(input);
                if (!success) {
                    write(<Line>  PID TTY          TIME CMD</Line>);
                    write(<Line>    1 pts/0    00:00:01 bash</Line>);
                    write(<Line>   42 pts/0    00:00:00 node</Line>);
                    write(<Line>   89 pts/0    00:00:00 bluedot-console</Line>);
                }
                break;
            }
            case "top": {
                const success = await tryGeminiCommand(input);
                if (!success) {
                    write(<Line>System: BlueDot Terminal v1.0</Line>);
                    write(<Line>Uptime: 2 days, 4 hours</Line>);
                    write(<Line>Load average: 0.12, 0.08, 0.05</Line>);
                    write(<Line>Memory: 512MB available</Line>);
                    write(<Line>Processes: 3 running</Line>);
                }
                break;
            }
            case "history":
                write(<Line>Command history:</Line>);
                history.slice(0, 10).forEach((cmd, i) => {
                    write(<Line>  {history.length - i} {cmd}</Line>);
                });
                if (history.length > 10) {
                    write(<Line>  ... ({history.length - 10} more commands)</Line>);
                }
                break;
            case "uname": {
                const success = await tryGeminiCommand(input);
                if (!success) {
                    const flags = rest.join(" ");
                    if (flags === "-a" || flags === "--all") {
                        write(<Line>BlueDot 1.0.0 bluedot-console x86_64 GNU/Linux</Line>);
                    } else {
                        write(<Line>BlueDot</Line>);
                    }
                }
                break;
            }
            case "clear":
                setEntries([]);
                break;
            default: {
                const success = await tryGeminiCommand(input);
                if (!success) {
                    write(<Line>Command not found: {cmd}. Try help.</Line>);
                }
                break;
            }
        }
    };

    const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (isRunning) return;
            const current = command;
            setHistory((prev) => (current ? [current, ...prev] : prev));
            setHistoryIndex(-1);
            setIsRunning(true);
            await runCommand(current);
            setCommand("");
            setIsRunning(false);
            focusInput();
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


    const handleClose = () => {
        setIsClosed(true);
    };
    const handleMinimize = () => {
        inputRef.current?.blur();
        onStateChange?.("minimized");
    };
    const handleMaximize = () => {
        const newState = windowState === "maximized" ? "normal" : "maximized";
        onStateChange?.(newState);
    };

    return (
        <div className="h-full min-h-0" onClick={focusInput}>
            <div className="w-full h-full min-h-0">
                {!isClosed ? (
                    <>
                        {/* scrollable terminal content */}
                        {windowState !== "minimized" && (
                            <div ref={scrollAreaRef} className="flex-1 min-h-0 overflow-y-auto font-mono text-sm leading-relaxed px-4 py-4">
                                <div className="space-y-2">
                                    {entries.map((e) => (
                                        <div key={e.id}>{e.content}</div>
                                    ))}
                                </div>
                                {!isRunning && (
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
                                )}
                            </div>
                        )}

                        {windowState === "maximized" && (
                            <div ref={scrollAreaRef} className="flex-1 min-h-0 overflow-y-auto font-mono text-sm leading-relaxed px-4 py-4">
                                <div className="space-y-2">
                                    {entries.map((e) => (
                                        <div key={e.id}>{e.content}</div>
                                    ))}
                                </div>
                                {!isRunning && (
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
                                )}
                            </div>
                        )}

                    </>
                ) : (
                    <div className="rounded-lg border border-neutral-800 bg-neutral-950/60 p-4 text-sm text-neutral-300">
                        <div className="flex items-center justify-between">
                            <div>Terminal closed.</div>
                            <button onClick={() => { setIsClosed(false); onStateChange?.("normal"); focusInput(); }} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500">Re-open</button>
                        </div>
                        <div className="mt-2 text-xs text-neutral-500">Click re-open to restore the console window.</div>
                    </div>
                )}
            </div>
        </div>
    );
}



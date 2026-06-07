import { useState, useRef, useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import { ArrowUp } from "lucide-react"
import { SearchModeSelector, type SearchMode } from "@/components/custom/search-mode-selector"

const SUGGESTION_CHIPS = [
    "game santai buat dimainkan bareng teman",
    "RPG open-world seperti Genshin Impact",
    "game horror yang seru",
    "strategi casual yang addictive",
]

const PLACEHOLDER_BY_MODE: Record<SearchMode, string> = {
    query: "Ceritakan game yang kamu cari...",
    title: "Masukkan judul game...",
}

export function SearchHero() {
    const [mode, setMode] = useState<SearchMode>("query")
    const [input, setInput] = useState("")
    const navigate = useNavigate()
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return
        textarea.style.height = "auto"
        const maxHeight = 150
        if (textarea.scrollHeight < maxHeight) {
            textarea.style.height = textarea.scrollHeight + "px"
            textarea.style.overflowY = "hidden"
        } else {
            textarea.style.height = maxHeight + "px"
            textarea.style.overflowY = "auto"
        }
    }, [input])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return
        if (mode === "query") {
            navigate({ to: "/recommend", search: { q: input.trim() } })
        } else {
            navigate({ to: "/recommend", search: { judul: input.trim() } })
        }
    }

    const handleChipClick = (chip: string) => {
        setInput(chip)
        setMode("query")
        navigate({ to: "/recommend", search: { q: chip } })
    }

    const handleModeChange = (newMode: SearchMode) => {
        setMode(newMode)
        setInput("")
        textareaRef.current?.focus()
    }

    return (
        <section className="hero-gradient min-h-[80vh] flex flex-col items-center justify-center px-4 pt-24 pb-16">
            <div className="max-w-2xl w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight">
                        Temukan game yang kamu suka.
                    </h1>
                    <p className="font-heading text-xl sm:text-2xl text-primary">
                        Pakai bahasa kamu sendiri.
                    </p>
                </div>

                <div className="surface-gradient rounded-2xl border-border p-4 space-y-3">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-start gap-3">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={PLACEHOLDER_BY_MODE[mode]}
                                rows={1}
                                className="flex-1 bg-transparent border-none outline-none text-foreground text-base placeholder:text-muted-foreground resize-none min-h-6 leading-relaxed focus:ring-0 focus:glow-violet-focus"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault()
                                        handleSubmit(e)
                                    }
                                }}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
                                aria-label="Submit"
                            >
                                <ArrowUp className="h-4 w-4" />
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer flex items-center justify-center"
                                aria-label="Attach"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <SearchModeSelector value={mode} onChange={handleModeChange} />
                        </div>
                    </div>
                </div>

                {mode === "query" && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {SUGGESTION_CHIPS.map((chip) => (
                            <button
                                key={chip}
                                onClick={() => handleChipClick(chip)}
                                className="surface-gradient border-border rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/20 hover:border-primary hover:text-foreground transition-colors duration-200 cursor-pointer"
                            >
                                {chip}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
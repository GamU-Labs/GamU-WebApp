import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { Search, Sparkles } from "lucide-react"

const SUGGESTION_CHIPS = [
    "game santai buat dimainkan bareng teman",
    "RPG open-world seperti Genshin Impact",
    "game horror yang seru",
    "strategi casual yang addictive",
]

export function SearchHero() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return
        navigate({ to: "/recommend", search: { q: query.trim() } })
    }

    const handleChipClick = (chip: string) => {
        setQuery(chip)
        navigate({ to: "/recommend", search: { q: chip } })
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

                <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
                    GamU menggunakan AI untuk memahami preferensi kamu dari bahasa natural, lalu merekomendasikan game yang cocok.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ceritakan game yang kamu cari..."
                            rows={3}
                            className="w-full rounded-xl border-border bg-card text-foreground px-4 py-3 text-base placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:glow-violet-focus transition-all duration-200"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSubmit(e)
                                }
                            }}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={!query.trim()}
                        className="bg-gradient-to-r from-primary to-cta text-cta-foreground font-heading px-8 py-3 rounded-xl glow-rose hover:opacity-90 transition-opacity duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Cari Game
                        <Search className="ml-2 h-4 w-4" />
                    </Button>
                </form>

                <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTION_CHIPS.map((chip) => (
                        <button
                            key={chip}
                            onClick={() => handleChipClick(chip)}
                            className="border-border rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/20 hover:border-primary hover:text-foreground transition-colors duration-200 cursor-pointer"
                        >
                            {chip}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
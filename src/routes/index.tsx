import { createFileRoute } from '@tanstack/react-router'
import { ResizableNavbar } from "@/components/custom/navbar"
// import { FloatingNavbar } from "@/components/floating-navbar"
import { SearchHero } from "@/components/custom/search-hero"
import { HowItWorks } from "@/components/custom/how-it-works"
import { Gamepad2, Sword, Puzzle, Skull, Car, Swords, Trophy } from "lucide-react"

export const Route = createFileRoute('/')({
    component: HomePage,
})

const categories = [
    { name: "Action", icon: Swords, color: "from-rose-500/20 to-rose-700/10", border: "border-rose-500/30", glow: "group-hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]" },
    { name: "RPG", icon: Sword, color: "from-violet-500/20 to-violet-700/10", border: "border-violet-500/30", glow: "group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]" },
    { name: "Strategy", icon: Puzzle, color: "from-cyan-500/20 to-cyan-700/10", border: "border-cyan-500/30", glow: "group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]" },
    { name: "Horror", icon: Skull, color: "from-slate-600/20 to-slate-800/10", border: "border-slate-500/30", glow: "group-hover:shadow-[0_0_20px_rgba(100,116,139,0.3)]" },
    { name: "Racing", icon: Car, color: "from-amber-500/20 to-amber-700/10", border: "border-amber-500/30", glow: "group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]" },
    { name: "Adventure", icon: Trophy, color: "from-emerald-500/20 to-emerald-700/10", border: "border-emerald-500/30", glow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]" },
]

function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <ResizableNavbar />
            
            <SearchHero />

            <HowItWorks />

            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-14 space-y-3">
                        <span className="inline-block font-heading text-xs text-primary tracking-[0.2em] uppercase bg-primary/10 px-4 py-1.5 rounded-full">
                            Genre
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
                            Jelajahi Berbagai <span className="text-primary">Genre</span>
                        </h2>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto">
                            Dari aksi hingga petualangan, temukan genre favoritmu
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {categories.map((cat) => {
                            const Icon = cat.icon
                            return (
                                <div
                                    key={cat.name}
                                    className={`group relative flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br ${cat.color} border ${cat.border} cursor-pointer transition-all duration-300 ${cat.glow} hover:-translate-y-1`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <Icon className="h-8 w-8 text-foreground/80 group-hover:text-foreground transition-colors duration-300 relative z-10" />
                                    <span className="font-heading text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-300 relative z-10">
                                        {cat.name}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <footer className="relative border-t border-primary/10 py-12 px-4">
                <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Gamepad2 className="h-5 w-5 text-primary" />
                                <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm" />
                            </div>
                            <span className="font-heading text-sm text-foreground">GamU</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            PJK-GM083 | Capstone Project 2026
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="/about"
                                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                            >
                                About
                            </a>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-primary/5 text-center">
                        <p className="text-[10px] text-muted-foreground/60">
                            &copy; {new Date().getFullYear()} GamU — Sistem Rekomendasi Game Berbasis LLM
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

import { createFileRoute } from '@tanstack/react-router'
import { ResizableNavbar } from "@/components/custom/navbar"
// import { FloatingNavbar } from "@/components/floating-navbar"
import { Gamepad2, Users, Brain, Sparkles, BookOpen, Target } from "lucide-react"
import Carousel from "@/components/ui/carousel"

export const Route = createFileRoute('/about')({
    component: AboutPage,
})

const teamMembers = [
    { name: "Nurrizky Arum Jatmiko", role: "AI Engineer", focus: "Prompt/pipeline ekstraksi intent, context handling", initials: "NA" },
    { name: "Firda Azzahra", role: "ML Engineer", focus: "Dataset, preprocessing, recommendation engine", initials: "FA" },
    { name: "Karima Ulya Hermawan", role: "ML Engineer", focus: "Dataset, preprocessing, recommendation engine", initials: "KU" },
    { name: "Daffa Nur Fakhri", role: "Project Manager & ML Engineer", focus: "Timeline, monitoring, + ML tasks", initials: "DN" },
    { name: "Hildan Kusto Utomo", role: "Full-Stack Engineer", focus: "Backend API, frontend, integrasi LLM + recommendation engine", initials: "HK" },
]

const milestones = [
    { year: "2026", event: "Proyek dimulai riset dan pengumpulan data game" },
    { year: "2026", event: "Pengembangan model rekomendasi dan pipeline LLM" },
    { year: "2026", event: "Frontend development dan integrasi sistem" },
    { year: "2026", event: "Peluncuran dan presentasi capstone" },
]

function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <ResizableNavbar />

            <section className="hero-gradient-strong bg-grid pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-3 p-3 rounded-full bg-primary/10 border border-primary/20">
                        <Gamepad2 className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-foreground">
                        Tentang <span className="text-primary">GamU</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Sistem Rekomendasi Game Berbasis LLM — mencari game via bahasa alami, 
                        mengekstraksi preferensi otomatis, dan merekomendasikan game dengan penjelasan personal.
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm">
                        <span className="text-muted-foreground">PJK-GM083</span>
                        <span className="text-primary/40">|</span>
                        <span className="text-muted-foreground">Capstone Project 2026</span>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 relative">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Brain, label: "LLM-Powered", desc: "Natural language" },
                            { icon: Target, label: "Akurat", desc: "Precision matching" },
                            { icon: Sparkles, label: "Personal", desc: "Custom recommendations" },
                            { icon: BookOpen, label: "Eksploratif", desc: "Discover new games" },
                        ].map((item) => {
                            const Icon = item.icon
                            return (
                                <div key={item.label} className="text-center p-4 rounded-xl surface-gradient border border-primary/10 space-y-2 hover:border-primary/30 transition-all duration-300 hover:glow-violet">
                                    <Icon className="h-5 w-5 mx-auto text-primary/70" />
                                    <p className="font-heading text-sm text-foreground">{item.label}</p>
                                    <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14 space-y-3">
                        <span className="inline-block font-heading text-xs text-primary tracking-[0.2em] uppercase bg-primary/10 px-4 py-1.5 rounded-full">
                            Tim
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
                            <Users className="h-6 w-6 inline-block text-primary mb-1" />{" "}
                            Tim <span className="text-primary">PJK-GM083</span>
                        </h2>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto">
                            Lima anggota dengan keahlian berbeda, satu tujuan
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Carousel
                            slides={teamMembers.map((m) => ({
                                title: m.name,
                                subtitle: m.role,
                                description: m.focus,
                                initials: m.initials,
                                accent: "from-primary/40 to-primary-deep/20",
                            }))}
                        />
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

                <div className="max-w-3xl mx-auto relative z-10">
                    <div className="text-center mb-14 space-y-3">
                        <span className="inline-block font-heading text-xs text-primary tracking-[0.2em] uppercase bg-primary/10 px-4 py-1.5 rounded-full">
                            Perjalanan
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
                            Timeline <span className="text-primary">Proyek</span>
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

                        <div className="space-y-10">
                            {milestones.map((ms, i) => (
                                <div
                                    key={i}
                                    className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                                >
                                    <div className="hidden md:block md:w-1/2" />
                                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-1.5 shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
                                    <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                                        <div className="surface-gradient border border-primary/10 rounded-xl p-4 hover:border-primary/30 transition-all duration-300 hover:glow-violet">
                                            <span className="font-heading text-sm text-primary">{ms.year}</span>
                                            <p className="text-sm text-foreground mt-1">{ms.event}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                            {["Home", "Blog"].map((link) => (
                                <a
                                    key={link}
                                    href={link === "Home" ? "/" : "/blog"}
                                    className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                                >
                                    {link}
                                </a>
                            ))}
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

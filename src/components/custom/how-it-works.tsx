import { MessageSquare, Cpu, Gamepad2 } from "lucide-react"

const steps = [
    {
        icon: MessageSquare,
        title: "Describe",
        description: "Ceritakan game yang kamu mau pakai bahasa sehari-hari. Tidak perlu filter atau tag rumit.",
        color: "from-primary/40 to-primary-deep/40",
        border: "border-primary/30 group-hover:border-primary",
        glow: "group-hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]",
    },
    {
        icon: Cpu,
        title: "AI Understands",
        description: "LLM mengekstrak preferensi, genre, dan mood dari deskripsi kamu secara otomatis.",
        color: "from-accent-cyan/30 to-primary/30",
        border: "border-accent-cyan/30 group-hover:border-accent-cyan",
        glow: "group-hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]",
    },
    {
        icon: Gamepad2,
        title: "Discover",
        description: "Recommendation engine memberikan kandidat game + penjelasan kenapa cocok buat kamu.",
        color: "from-accent-gold/30 to-primary/30",
        border: "border-accent-gold/30 group-hover:border-accent-gold",
        glow: "group-hover:shadow-[0_0_25px_rgba(251,191,36,0.3)]",
    },
]

export function HowItWorks() {
    return (
        <section className="py-24 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-dense opacity-50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-3">
                    <span className="inline-block font-heading text-xs text-primary tracking-[0.2em] uppercase bg-primary/10 px-4 py-1.5 rounded-full">
                        Cara Kerja
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl text-foreground">
                        Bagaimana <span className="text-gradient">GamU</span> Bekerja?
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                        Tiga langkah sederhana untuk menemukan game impian kamu
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <div
                                    key={step.title}
                                    className="group relative flex flex-col items-center text-center"
                                >
                                    <div className="relative z-10 mb-6">
                                        <div className={`absolute -inset-3 bg-gradient-to-br ${step.color} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                        <div className={`relative bg-background border-2 ${step.border} rounded-full p-4 transition-all duration-300 ease-out ${step.glow}`}>
                                            <Icon className="h-8 w-8 text-foreground transition-colors duration-300 group-hover:text-primary" />
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <span className="font-heading text-4xl font-bold text-primary/10 absolute -top-8 left-1/2 -translate-x-1/2 select-none">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="font-heading text-xl text-foreground mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px] mx-auto">
                                            {step.description}
                                        </p>
                                    </div>

                                    {index < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-8 -right-6 z-20">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary/30 group-hover:text-primary/60 transition-colors duration-300">
                                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

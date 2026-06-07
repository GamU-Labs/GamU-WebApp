import { MessageSquare, Cpu, Gamepad2, ArrowRight } from "lucide-react"

const steps = [
    {
        icon: MessageSquare,
        title: "Describe",
        description: "Ceritakan game yang kamu mau pakai bahasa sehari-hari. Tidak perlu filter atau tag rumit.",
    },
    {
        icon: Cpu,
        title: "AI Understands",
        description: "LLM mengekstrak preferensi, genre, dan mood dari deskripsi kamu secara otomatis.",
    },
    {
        icon: Gamepad2,
        title: "Discover",
        description: "Recommendation engine memberikan kandidat game + penjelasan kenapa cocok buat kamu.",
    },
]

export function HowItWorks() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="font-heading text-2xl sm:text-3xl text-center text-foreground mb-16">
                    Cara Kerja GamU
                </h2>

                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="group relative flex flex-col items-center text-center space-y-5"
                            >
                                <div className="relative z-10">
                                    <div className="bg-background border-2 border-primary rounded-full p-4 transition-all duration-300 ease-out group-hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] group-hover:border-secondary">
                                        <step.icon className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-secondary" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <span className="font-heading text-xs text-primary/60 tracking-widest uppercase">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="font-heading text-xl text-foreground">
                                        {step.title}
                                    </h3>
                                </div>

                                <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
                                    {step.description}
                                </p>

                                {index < steps.length - 1 && (
                                    <ArrowRight className="hidden md:block absolute top-4 -right-6 h-5 w-5 text-primary/40 z-20" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
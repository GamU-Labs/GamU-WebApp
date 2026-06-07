import { MessageSquare, Cpu, Gamepad2 } from "lucide-react"

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
            <div className="max-w-4xl mx-auto">
                <h2 className="font-heading text-2xl sm:text-3xl text-center text-foreground mb-12">
                    Cara Kerja GamU
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className="surface-gradient rounded-xl border-border p-6 text-center space-y-4 hover:glow-violet transition-all duration-300 cursor-default"
                        >
                            <div className="flex items-center justify-center">
                                <div className="bg-primary/20 rounded-full p-4">
                                    <step.icon className="h-8 w-8 text-primary" />
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-xs font-heading text-muted-foreground bg-card rounded-full px-2 py-0.5">
                                    Step {index + 1}
                                </span>
                                <h3 className="font-heading text-lg text-foreground">
                                    {step.title}
                                </h3>
                            </div>

                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {step.description}
                            </p>

                            {index < steps.length - 1 && (
                                <div className="hidden md:flex items-center justify-center text-primary">
                                    &rarr;
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
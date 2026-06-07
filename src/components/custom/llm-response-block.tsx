import { Cpu } from "lucide-react"

interface LlmResponseBlockProps {
    response: string | null
}

export function LlmResponseBlock({ response }: LlmResponseBlockProps) {
    if (!response) return null

    const paragraphs = response
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)

    return (
        <div className="surface-gradient rounded-xl border-border p-6 space-y-4">
            <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-sm text-foreground">
                    AI Recommendation
                </h3>
            </div>

            <div className="space-y-3">
                {paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground text-sm leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    )
}
import { Cpu } from "lucide-react"
import type { LlmExplanation } from "@/lib/schemas"

interface LlmResponseBlockProps {
    response: LlmExplanation | null
}

export function LlmResponseBlock({ response }: LlmResponseBlockProps) {
    if (!response) return null

    return (
        <div className="surface-gradient rounded-xl border-border p-6 space-y-4">
            <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-sm text-foreground">
                    AI Recommendation
                </h3>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
                {response.intro}
            </p>

            <div className="space-y-3">
                {response.highlights.map((highlight, index) => (
                    <div key={highlight.game_title} className="flex gap-3">
                        <span className="text-primary font-semibold text-sm flex-shrink-0">
                            {index + 1}.
                        </span>
                        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                            <strong className="text-foreground font-semibold">{highlight.game_title}</strong>
                            — {highlight.reason}
                        </p>
                    </div>
                ))}
            </div>

            <p className="text-foreground text-sm leading-relaxed font-medium">
                {response.conclusion}
            </p>
        </div>
    )
}
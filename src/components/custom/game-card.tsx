import type { GameRecommendation } from "@/lib/schemas"
import { Badge } from "@/components/ui/badge"
import { Gamepad2 } from "lucide-react"
import { useState } from "react"

interface GameCardProps {
    game: GameRecommendation
}

export function GameCard({ game }: GameCardProps) {
    const tags = game.tags_clean.trim().split(/\s+/).filter(Boolean)
    const similarityPercent = Math.round(game.similarity_score * 100)
    const [imgError, setImgError] = useState(false)

    return (
        <div className="surface-gradient rounded-xl border-border overflow-hidden hover:shadow-[0_8px_30px_rgba(124,58,237,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
            <div className="relative h-32 bg-linear-to-br from-primary/30 via-card to-secondary/20 flex items-center justify-center overflow-hidden">
                {game.header_image && !imgError ? (
                    <img
                        src={game.header_image}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <Gamepad2 className="h-12 w-12 text-primary/60 group-hover:text-primary/80 transition-colors duration-300" />
                )}
                <div className="absolute bottom-2 right-2 bg-primary/90 text-primary-foreground text-xs font-heading px-2 py-0.5 rounded-md">
                    {similarityPercent}% match
                </div>
            </div>

            <div className="p-4 space-y-3">
                <h3 className="font-heading text-base text-foreground line-clamp-1">
                    {game.title}
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                    {game.desc_sentence}
                </p>

                <div className="flex flex-wrap gap-1.5">
                    {tags.slice(0, 4).map((tag) => (
                        <Badge
                            key={tag}
                            variant="outline"
                            className="border-primary/30 text-primary text-xs cursor-default"
                        >
                            {tag}
                        </Badge>
                    ))}
                    {tags.length > 4 && (
                        <Badge variant="outline" className="border-border text-muted-foreground text-xs cursor-default">
                            +{tags.length - 4}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    )
}
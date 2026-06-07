import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const recommendSearchSchema = z.object({
    q: z.string().optional(),
})

export const Route = createFileRoute('/recommend')({
    validateSearch: recommendSearchSchema,
    component: RecommendPage,
})

import { useState, useEffect } from "react"
import { useSearch } from "@tanstack/react-router"
import { useRecommendByQuery } from "@/lib/api"
import { FloatingNavbar } from "@/components/floating-navbar"
import { GameCard } from "@/components/custom/game-card"
import { LlmResponseBlock } from "@/components/custom/llm-response-block"
import { SkeletonGameCard, SkeletonLlmResponse } from "@/components/skeleton-loader"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowLeft, AlertCircle } from "lucide-react"

function RecommendPage() {
    const search = useSearch({ strict: false }) as { q?: string }
    const initialQuery = search.q || ""
    const [query, setQuery] = useState(initialQuery)
    const mutation = useRecommendByQuery()

    useEffect(() => {
        if (initialQuery.trim()) {
            mutation.mutate({ query: initialQuery.trim() })
        }
    }, [initialQuery])

    const handleRefine = (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return
        mutation.mutate({ query: query.trim() })
    }

    const hasResults = (mutation.data?.data?.recommendations?.length ?? 0) > 0

    return (
        <div className="min-h-screen bg-background">
            <FloatingNavbar />

            <main className="pt-24 pb-16 px-4 max-w-5xl mx-auto space-y-8">
                <div className="space-y-2">
                    <Button
                        variant="ghost"
                        onClick={() => window.history.back()}
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Button>

                    {mutation.data?.data?.query && (
                        <p className="text-sm text-muted-foreground">
                            Hasil untuk: <span className="text-foreground font-heading">"{mutation.data.data.query}"</span>
                        </p>
                    )}
                </div>

                {mutation.isPending && (
                    <div className="space-y-6">
                        <SkeletonLlmResponse />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <SkeletonGameCard key={i} />
                            ))}
                        </div>
                    </div>
                )}

                {mutation.isError && (
                    <div className="surface-gradient rounded-xl border-destructive/30 p-8 text-center space-y-4">
                        <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                        <p className="text-foreground font-heading">Gagal mendapatkan rekomendasi</p>
                        <p className="text-muted-foreground text-sm">{mutation.error.message}</p>
                        <Button
                            onClick={() => mutation.mutate({ query: initialQuery })}
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/20 cursor-pointer"
                        >
                            Coba Lagi
                        </Button>
                    </div>
                )}

                {mutation.isSuccess && !hasResults && (
                    <div className="surface-gradient rounded-xl border-border p-8 text-center space-y-4">
                        <p className="text-foreground font-heading">Tidak ada rekomendasi ditemukan</p>
                        <p className="text-muted-foreground text-sm">
                            Coba deskripsi lain yang lebih spesifik
                        </p>
                    </div>
                )}

                {mutation.isSuccess && hasResults && (
                    <div className="space-y-6">
                        <LlmResponseBlock response={mutation.data.data.llm_response} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mutation.data.data.recommendations.map((game) => (
                                <GameCard key={game.title} game={game} />
                            ))}
                        </div>
                    </div>
                )}

                {!mutation.isPending && (
                    <div className="surface-gradient rounded-xl border-border p-6 space-y-4">
                        <h3 className="font-heading text-sm text-foreground">
                            Belum cocok? Coba deskripsi lain:
                        </h3>
                        <form onSubmit={handleRefine} className="flex gap-3">
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ceritakan lebih spesifik game yang kamu cari..."
                                rows={2}
                                className="flex-1 rounded-xl border-border bg-card text-foreground px-4 py-3 text-sm placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:glow-violet-focus transition-all duration-200"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault()
                                        handleRefine(e)
                                    }
                                }}
                            />
                            <Button
                                type="submit"
                                disabled={!query.trim()}
                                className="bg-gradient-to-r from-primary to-cta text-cta-foreground font-heading px-6 rounded-xl glow-rose hover:opacity-90 transition-opacity duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Sparkles className="h-5 w-5" />
                            </Button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    )
}
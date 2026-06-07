import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const recommendSearchSchema = z.object({
    q: z.string().optional(),
    judul: z.string().optional(),
})

export const Route = createFileRoute('/recommend')({
    validateSearch: recommendSearchSchema,
    component: RecommendPage,
})

import { useState, useRef, useEffect } from "react"
import { useSearch } from "@tanstack/react-router"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { recommendByQuery, recommendByTitle } from "@/lib/api"
import { FloatingNavbar } from "@/components/floating-navbar"
import { GameCard } from "@/components/custom/game-card"
import { LlmResponseBlock } from "@/components/custom/llm-response-block"
import { SkeletonGameCard, SkeletonLlmResponse } from "@/components/skeleton-loader"
import { Button } from "@/components/ui/button"
import { SearchModeSelector, type SearchMode } from "@/components/custom/search-mode-selector"
import { ArrowLeft, ArrowUp, AlertCircle } from "lucide-react"

const PLACEHOLDER_BY_MODE: Record<SearchMode, string> = {
    query: "Ceritakan lebih spesifik game yang kamu cari...",
    title: "Masukkan judul game...",
}

function RecommendPage() {
    const search = useSearch({ strict: false }) as { q?: string; judul?: string }
    const initialQuery = search.q || ""
    const initialJudul = search.judul || ""

    const [mode, setMode] = useState<SearchMode>(initialJudul ? "title" : "query")
    const [input, setInput] = useState(initialQuery || initialJudul || "")
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const queryClient = useQueryClient()

    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return
        textarea.style.height = "auto"
        const maxHeight = 150
        if (textarea.scrollHeight < maxHeight) {
            textarea.style.height = textarea.scrollHeight + "px"
            textarea.style.overflowY = "hidden"
        } else {
            textarea.style.height = maxHeight + "px"
            textarea.style.overflowY = "auto"
        }
    }, [input])

    const queryResult = useQuery({
        queryKey: ["recommend", "query", initialQuery],
        queryFn: () => recommendByQuery(initialQuery),
        enabled: initialQuery.trim().length > 0,
    })

    const titleResult = useQuery({
        queryKey: ["recommend", "title", initialJudul],
        queryFn: () => recommendByTitle(initialJudul),
        enabled: initialJudul.trim().length > 0,
    })

    const refineQueryMutation = useMutation({
        mutationFn: ({ query }: { query: string }) => recommendByQuery(query),
        onSuccess: (data) => {
            queryClient.setQueryData(["recommend", "query", data.data.query], data)
        },
    })

    const refineTitleMutation = useMutation({
        mutationFn: ({ judul }: { judul: string }) => recommendByTitle(judul),
        onSuccess: (data) => {
            queryClient.setQueryData(["recommend", "title", data.data.input_game], data)
        },
    })

    const activeInitialResult = mode === "query" ? queryResult : titleResult

    const isFetchingInitial = activeInitialResult.isFetching
    const initialError = activeInitialResult.error

    const isRefining = refineQueryMutation.isPending || refineTitleMutation.isPending
    const refineError = refineQueryMutation.error || refineTitleMutation.error

    const isLoading = isFetchingInitial || isRefining
    const error = refineError || initialError

    const queryInitialData = queryResult.data?.data
    const titleInitialData = titleResult.data?.data
    const queryRefineData = refineQueryMutation.data?.data
    const titleRefineData = refineTitleMutation.data?.data

    const responseData = mode === "query"
        ? (queryRefineData ?? queryInitialData)
        : (titleRefineData ?? titleInitialData)
    const hasResults = (responseData?.recommendations?.length ?? 0) > 0
    const displayQuery = mode === "query"
        ? (queryRefineData?.query ?? queryInitialData?.query)
        : (titleRefineData?.input_game ?? titleInitialData?.input_game)

    const handleRefine = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return
        if (mode === "query") {
            refineQueryMutation.mutate({ query: input.trim() })
        } else {
            refineTitleMutation.mutate({ judul: input.trim() })
        }
    }

    const handleModeChange = (newMode: SearchMode) => {
        setMode(newMode)
        setInput("")
        refineQueryMutation.reset()
        refineTitleMutation.reset()
        textareaRef.current?.focus()
    }

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

                    {displayQuery && (
                        <p className="text-sm text-muted-foreground">
                            {mode === "query" ? "Hasil untuk:" : "Game serupa dengan:"}
                            <span className="text-foreground font-heading">"{displayQuery}"</span>
                        </p>
                    )}
                </div>

                {isLoading && (
                    <div className="space-y-6">
                        <SkeletonLlmResponse />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <SkeletonGameCard key={i} />
                            ))}
                        </div>
                    </div>
                )}

                {error && !isLoading && (
                    <div className="surface-gradient rounded-xl border-destructive/30 p-8 text-center space-y-4">
                        <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                        <p className="text-foreground font-heading">Gagal mendapatkan rekomendasi</p>
                        <p className="text-muted-foreground text-sm">{error.message}</p>
                        <Button
                            onClick={() => {
                                if (mode === "query") refineQueryMutation.mutate({ query: input.trim() || initialQuery })
                                else refineTitleMutation.mutate({ judul: input.trim() || initialJudul })
                            }}
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/20 cursor-pointer"
                        >
                            Coba Lagi
                        </Button>
                    </div>
                )}

                {!isLoading && !error && !hasResults && (initialQuery || initialJudul) && (
                    <div className="surface-gradient rounded-xl border-border p-8 text-center space-y-4">
                        <p className="text-foreground font-heading">Tidak ada rekomendasi ditemukan</p>
                        <p className="text-muted-foreground text-sm">
                            {mode === "query"
                                ? "Coba deskripsi lain yang lebih spesifik"
                                : "Coba judul game lain"
                            }
                        </p>
                    </div>
                )}

                {!isLoading && !error && hasResults && (
                    <div className="space-y-6">
                        <LlmResponseBlock response={responseData?.llm_response ?? null} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {responseData?.recommendations.map((game) => (
                                <GameCard key={game.title} game={game} />
                            ))}
                        </div>
                    </div>
                )}

                {!isLoading && (
                    <div className="surface-gradient rounded-2xl border-border p-4 space-y-3">
                        <form onSubmit={handleRefine}>
                            <div className="flex items-start gap-3">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={PLACEHOLDER_BY_MODE[mode]}
                                    rows={1}
                                    className="flex-1 bg-transparent border-none outline-none text-foreground text-sm placeholder:text-muted-foreground resize-none min-h-6 leading-relaxed focus:ring-0"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault()
                                            handleRefine(e)
                                        }
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
                                    aria-label="Submit"
                                >
                                    <ArrowUp className="h-4 w-4" />
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground font-heading">
                                    {mode === "query"
                                        ? "Belum cocok? Coba deskripsi lain"
                                        : "Belum cocok? Coba judul lain"
                                    }
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <SearchModeSelector value={mode} onChange={handleModeChange} />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
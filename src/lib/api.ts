import { useMutation } from "@tanstack/react-query"
import { postRecommendResponseSchema, getRecommendResponseSchema } from "@/lib/schemas"
import type { PostRecommendResponse, GetRecommendResponse } from "@/lib/schemas"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8989"

export async function BlogAPI(): Promise<{ message: string }> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: "Hello from blog API" })
        }, 1000)
    })
}

export async function recommendByQuery(query: string, topN?: number): Promise<PostRecommendResponse> {
    const res = await fetch(`${API_BASE_URL}/api/v1/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, topN: topN ?? 5 }),
    })

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Gagal menghubungi server", error: "NetworkError" }))
        throw new Error(errorData.message || `Error ${res.status}`)
    }

    const data = await res.json()
    return postRecommendResponseSchema.parse(data)
}

export async function recommendByTitle(judul: string, topN?: number): Promise<GetRecommendResponse> {
    const params = new URLSearchParams({ judul })
    if (topN) params.set("topN", String(topN))

    const res = await fetch(`${API_BASE_URL}/api/v1/recommend?${params.toString()}`)

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Gagal menghubungi server", error: "NetworkError" }))
        throw new Error(errorData.message || `Error ${res.status}`)
    }

    const data = await res.json()
    return getRecommendResponseSchema.parse(data)
}

export function useRecommendByQuery() {
    return useMutation({
        mutationFn: ({ query, topN }: { query: string; topN?: number }) => recommendByQuery(query, topN),
    })
}

export function useRecommendByTitle() {
    return useMutation({
        mutationFn: ({ judul, topN }: { judul: string; topN?: number }) => recommendByTitle(judul, topN),
    })
}
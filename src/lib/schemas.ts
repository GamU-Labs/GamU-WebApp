import { z } from "zod"

export const llmHighlightSchema = z.object({
    game_title: z.string(),
    reason: z.string(),
})

export const llmExplanationSchema = z.object({
    intro: z.string(),
    highlights: z.array(llmHighlightSchema),
    conclusion: z.string(),
})

export type LlmExplanation = z.infer<typeof llmExplanationSchema>

export const gameRecommendationSchema = z.object({
    title: z.string(),
    rating: z.number().nullable(),
    desc_sentence: z.string(),
    tags_clean: z.string(),
    similarity_score: z.number(),
})

export const postRecommendResponseSchema = z.object({
    message: z.string(),
    data: z.object({
        query: z.string(),
        status: z.string(),
        recommendations: z.array(gameRecommendationSchema),
        llm_response: llmExplanationSchema.nullable(),
    }),
})

export const getRecommendResponseSchema = z.object({
    message: z.string(),
    data: z.object({
        input_game: z.string(),
        status: z.string(),
        recommendations: z.array(gameRecommendationSchema),
        llm_response: llmExplanationSchema.nullable(),
    }),
})

export const recommendRequestSchema = z.object({
    query: z.string().min(1).max(500),
    topN: z.number().min(1).max(20).optional(),
})

export const recommendByTitleRequestSchema = z.object({
    judul: z.string().min(1).max(100),
    topN: z.number().min(1).max(20).optional(),
})

export const errorResponseSchema = z.object({
    message: z.string(),
    error: z.string(),
    details: z.record(z.string(), z.unknown()).optional(),
})

export type GameRecommendation = z.infer<typeof gameRecommendationSchema>
export type PostRecommendResponse = z.infer<typeof postRecommendResponseSchema>
export type GetRecommendResponse = z.infer<typeof getRecommendResponseSchema>
export type RecommendRequest = z.infer<typeof recommendRequestSchema>
export type ErrorResponse = z.infer<typeof errorResponseSchema>
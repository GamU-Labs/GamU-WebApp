import { createServerFn } from '@tanstack/react-start'

const greetings = [
    'Welcome to GamU!',
    'Selamat datang di GamU!',
    'Sugeng rawuh ing GamU!',
    'Willkommen bei GamU!',
    'Bienvenue chez GamU!',
]

export const getGreeting = createServerFn({ method: 'GET' }).handler(async () => {
    await new Promise(r => setTimeout(r, 200))
    const idx = Math.floor(Math.random() * greetings.length)
    return {
        message: greetings[idx],
        timestamp: new Date().toISOString(),
        source: 'server-function'
    }
})

export const pingBackend = createServerFn({ method: 'GET' }).handler(async () => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000'
    try {
        const res = await fetch(`${backendUrl}/health`, { signal: AbortSignal.timeout(3000) })
        const data = await res.json()
        return { status: 'ok', data }
    } catch {
        return { status: 'unreachable', data: null }
    }
})

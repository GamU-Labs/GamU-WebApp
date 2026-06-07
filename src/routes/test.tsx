import { createFileRoute, useRouter } from '@tanstack/react-router'
import { getGreeting } from '@/lib/server/demo'

export const Route = createFileRoute('/test')({
    component: RouteComponent,
    loader: async () => await getGreeting(),
})

function RouteComponent() {
    const router = useRouter()
    const data = Route.useLoaderData()

    const refresh = () => router.invalidate()

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-8">
            <h1 className="text-3xl font-bold">TanStack Start</h1>

            <div className="rounded-xl border p-6 text-center max-w-md w-full space-y-2">
                <p className="text-lg">{data.message}</p>
                <p className="text-xs text-muted-foreground">{data.timestamp}</p>
                <p className="text-xs text-muted-foreground">source: {data.source}</p>
            </div>

            <button
                type="button"
                onClick={refresh}
                className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
            >
                Greet me again
            </button>

            <p className="text-sm text-muted-foreground">
                Data loaded via SSR, refreshed via Server Function
            </p>
        </div>
    )
}

export function SkeletonGameCard() {
    return (
        <div className="surface-gradient rounded-xl border-border overflow-hidden animate-pulse">
            <div className="h-32 bg-card" />
            <div className="p-4 space-y-3">
                <div className="h-5 bg-card rounded w-3/4" />
                <div className="h-4 bg-card rounded w-full" />
                <div className="h-4 bg-card rounded w-2/3" />
                <div className="flex gap-1.5">
                    <div className="h-5 w-16 bg-card rounded" />
                    <div className="h-5 w-20 bg-card rounded" />
                    <div className="h-5 w-14 bg-card rounded" />
                </div>
            </div>
        </div>
    )
}

export function SkeletonLlmResponse() {
    return (
        <div className="surface-gradient rounded-xl border-border p-6 space-y-4 animate-pulse">
            <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-card rounded-full" />
                <div className="h-4 bg-card rounded w-32" />
            </div>
            <div className="space-y-3">
                <div className="h-4 bg-card rounded w-full" />
                <div className="h-4 bg-card rounded w-5/6" />
                <div className="h-4 bg-card rounded w-4/5" />
            </div>
        </div>
    )
}
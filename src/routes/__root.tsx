import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { ReactNode } from 'react'
import { ThemeProvider } from '@/providers/theme'
import appCss from '../index.css?url'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { title: 'GamU' },
        ],
        links: [
            { rel: 'stylesheet', href: appCss },
        ],
    }),
    component: RootComponent,
})

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
        },
    },
})

function RootComponent() {
    return (
        <RootDocument>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Outlet />
                </ThemeProvider>
            </QueryClientProvider>
            <TanStackRouterDevtools />
        </RootDocument>
    )
}

function RootDocument({ children }: { children: ReactNode }) {
    return (
        <html lang="id" className="dark">
            <head>
                <HeadContent />
            </head>
            <body className="min-h-screen bg-background text-foreground font-body antialiased">
                {children}
                <Scripts />
            </body>
        </html>
    )
}
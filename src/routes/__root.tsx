import { Separator } from '@/components/ui/separator'
import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from '@tanstack/react-router'
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

function RootComponent() {
    const routerState = useRouterState()
    const currentPath = routerState.location.pathname
    const isProtectedRoute = currentPath.startsWith('/_backoffice') ||
        currentPath.includes('/management')

    const queryClient = new QueryClient()

    if (isProtectedRoute) {
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

    return (
        <RootDocument>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <div className="mt-16">
                        <Outlet />
                    </div>
                    <Separator />
                </ThemeProvider>
            </QueryClientProvider>
            <TanStackRouterDevtools />
        </RootDocument>
    )
}

function RootDocument({ children }: { children: ReactNode }) {
    return (
        <html>
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    )
}

import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient()

export function getRouter() {
    const router = createRouter({
        routeTree,
        context: { queryClient },
        scrollRestoration: true,
    })

    return router
}

export { queryClient }

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof getRouter>
    }
}

import { createFileRoute } from '@tanstack/react-router'
import { FloatingNavbar } from "@/components/floating-navbar"
import { SearchHero } from "@/components/custom/search-hero"
import { HowItWorks } from "@/components/custom/how-it-works"
import { Separator } from "@/components/ui/separator"
import { Gamepad2 } from "lucide-react"

export const Route = createFileRoute('/')({
    component: HomePage,
})

function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            <FloatingNavbar />

            <SearchHero />

            <Separator className="bg-border" />

            <HowItWorks />

            <Separator className="bg-border" />

            <footer className="py-8 px-4 text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                    <Gamepad2 className="h-4 w-4 text-primary" />
                    <span className="font-heading text-sm text-foreground">GamU</span>
                </div>
                <p className="text-xs text-muted-foreground">
                    GamU &copy; 2026 | PJK-GM083 | Capstone Project
                </p>
            </footer>
        </div>
    )
}
import { createFileRoute } from '@tanstack/react-router'
import { FloatingNavbar } from "@/components/floating-navbar"
import { Separator } from "@/components/ui/separator"
import { Gamepad2, Users } from "lucide-react"

export const Route = createFileRoute('/about')({
    component: AboutPage,
})

const teamMembers = [
    { name: "Hildan Kusto Utomo", role: "Full-Stack Engineer", focus: "Backend API, frontend, integrasi LLM + recommendation engine" },
    { name: "Nurrizky Arum Jatmiko", role: "AI Engineer", focus: "Prompt/pipeline ekstraksi intent, context handling" },
    { name: "Firda Azzahra", role: "ML Engineer", focus: "Dataset, preprocessing, recommendation engine" },
    { name: "Karima Ulya Hermawan", role: "ML Engineer", focus: "Dataset, preprocessing, recommendation engine" },
    { name: "Daffa Nur Fakhri", role: "Project Manager & ML Engineer", focus: "Timeline, monitoring, + ML tasks" },
]

function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <FloatingNavbar />

            <main className="pt-24 pb-16 px-4 max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <Gamepad2 className="h-10 w-10 text-primary" />
                        <h1 className="font-heading text-3xl sm:text-4xl text-foreground">
                            GamU
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                        Sistem Rekomendasi Game Berbasis LLM, memungkinkan pencarian game via bahasa alami, mengekstraksi preferensi secara otomatis, dan merekomendasikan game dengan penjelasan personal.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        PJK-GM083 | Capstone Project 2026
                    </p>
                </div>

                <Separator className="bg-border" />

                <section className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <h2 className="font-heading text-xl text-foreground">Tim PJK-GM083</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="surface-gradient rounded-xl border-border p-4 space-y-2">
                                <p className="font-heading text-base text-foreground">{member.name}</p>
                                <p className="text-xs text-primary">{member.role}</p>
                                <p className="text-sm text-muted-foreground">{member.focus}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
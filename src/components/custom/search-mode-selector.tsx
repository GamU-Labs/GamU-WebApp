import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MessageSquareText, Gamepad2, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type SearchMode = "query" | "title"

interface SearchModeOption {
    value: SearchMode
    label: string
    badge: string
    description: string
    icon: React.ReactNode
}

const MODE_OPTIONS: SearchModeOption[] = [
    {
        value: "query",
        label: "By Query",
        badge: "Natural Language",
        description: "Deskripsi bebas, AI memahami preferensi kamu",
        icon: <MessageSquareText className="h-4 w-4" />,
    },
    {
        value: "title",
        label: "By Title",
        badge: "Exact Match",
        description: "Masukkan judul game, temukan game serupa",
        icon: <Gamepad2 className="h-4 w-4" />,
    },
]

interface SearchModeSelectorProps {
    value: SearchMode
    onChange: (mode: SearchMode) => void
}

export function SearchModeSelector({ value, onChange }: SearchModeSelectorProps) {
    const activeOption = MODE_OPTIONS.find((o) => o.value === value)!

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-xs font-heading transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                    aria-label="Select search mode"
                >
                    {activeOption.icon}
                    <span>{activeOption.label}</span>
                    <span className="text-muted-foreground/70">{activeOption.badge}</span>
                    <ChevronDown className="h-3 w-3" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                side="top"
                align="end"
                sideOffset={8}
                className="w-72 rounded-xl bg-popover border-border shadow-[0_10px_25px_rgba(0,0,0,0.5)] p-2"
            >
                {MODE_OPTIONS.map((option) => {
                    const isActive = value === option.value
                    return (
                        <DropdownMenuItem
                            key={option.value}
                            onClick={() => onChange(option.value)}
                            className={cn(
                                "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 cursor-pointer",
                                isActive && "bg-primary/10"
                            )}
                        >
                            <div className="flex items-center gap-2.5">
                                <span className="text-muted-foreground">{option.icon}</span>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-heading text-foreground">{option.label}</span>
                                    <span className="text-xs text-muted-foreground">{option.description}</span>
                                </div>
                            </div>
                            {isActive && <Check className="h-4 w-4 text-primary" />}
                        </DropdownMenuItem>
                    )
                })}
                <DropdownMenuSeparator className="bg-border" />
                <div className="px-3 py-2 text-xs text-muted-foreground">
                    Pilih mode pencarian
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
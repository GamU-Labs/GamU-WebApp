import { Link } from "@tanstack/react-router"
import { useTheme } from "@/hooks/use-theme"
import { Computer, Moon, Sun, Gamepad2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function FloatingNavbar() {
    const { theme, setThemeMode } = useTheme()

    return (
        <nav className="fixed top-4 left-4 right-4 z-50 glass rounded-xl">
            <div className="flex items-center justify-between px-6 py-3">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <Gamepad2 className="h-6 w-6 text-primary" />
                    <span className="font-heading text-lg text-foreground">GamU</span>
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        to="/about"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
                    >
                        About
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="cursor-pointer">
                                {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
                                {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
                                {theme === "system" && <Computer className="h-[1.2rem] w-[1.2rem]" />}
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setThemeMode("light")} className="cursor-pointer">
                                <Sun className="mr-2 h-4 w-4" /> Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setThemeMode("dark")} className="cursor-pointer">
                                <Moon className="mr-2 h-4 w-4" /> Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setThemeMode("system")} className="cursor-pointer">
                                <Computer className="mr-2 h-4 w-4" /> System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}
import { createContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

type ThemeContextType = {
    theme: Theme
    setThemeMode: (mode: Theme) => void
}

const THEME_STORAGE_KEY = "theme-preference"

const getStoredTheme = (): Theme => {
    if (typeof window !== 'undefined') {
        return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || "system"
    }
    return "system"
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getStoredTheme)

    const setThemeMode = (mode: Theme) => {
        setTheme(mode)
        if (typeof window !== 'undefined') {
            localStorage.setItem(THEME_STORAGE_KEY, mode)
        }
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        const applyTheme = () => {
            if (theme === "dark") {
                document.documentElement.classList.add("dark")
            } else if (theme === "light") {
                document.documentElement.classList.remove("dark")
            } else {
                document.documentElement.classList.toggle("dark", mediaQuery.matches)
            }
        }

        applyTheme()

        const handleChange = () => {
            if (theme === "system") applyTheme()
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

import { createContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

type ThemeContextType = {
    theme: Theme
    setThemeMode: (mode: Theme) => void
}

const THEME_STORAGE_KEY = "theme-preference"

const getStoredTheme = (): Theme => {
    if (typeof window !== 'undefined') {
        return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || "dark"
    }
    return "dark"
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getStoredTheme)

    const setThemeMode = (mode: Theme) => {
        setTheme(mode)
        localStorage.setItem(THEME_STORAGE_KEY, mode)
    }

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

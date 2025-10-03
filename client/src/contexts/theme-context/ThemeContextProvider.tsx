import { useContext, createContext, useState, useEffect } from "react";
import type { FC, ReactNode } from 'react'

type Theme = "system" | "light" | "dark"

export interface IThemeContext {
    theme: Theme;
    setTheme: (theme: Theme) => void
}


const ThemeContext = createContext<IThemeContext | undefined>(undefined)


export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider")
    }

    return context
}


export const ThemeProvider: FC<{ children: ReactNode, storageKey?: string }> = ({ children, storageKey = "dashboard-theme" }) => {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || "system"
    )



    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("dark", "light")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

            root.classList.add(systemTheme)
            return
        }
        root.classList.add(theme)

    }, [theme])

    const value: IThemeContext = {
        theme,
        setTheme: (newTheme: Theme) => {
            localStorage.setItem(storageKey, newTheme)
            setTheme(newTheme)
        },
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
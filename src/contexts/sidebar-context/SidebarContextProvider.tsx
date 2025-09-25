import { createContext, useContext, useState, useEffect } from "react"
import type { FC, ReactNode } from "react"


interface ISidebarContextProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<ISidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext)
    if (context === undefined) {
        throw new Error("useSidebar must be used within SidebarProvider")
    }

    return context
}


export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

    useEffect(() => {
        window.matchMedia("(max-width: 1000px)")
            .matches
            ? setIsSidebarOpen(false)
            : setIsSidebarOpen(true)
    }, [])

    const value: ISidebarContextProps = {
        isSidebarOpen,
        setIsSidebarOpen,
    }

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>

}
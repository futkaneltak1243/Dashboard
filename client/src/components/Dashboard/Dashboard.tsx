import type { FC, ReactNode } from "react";
import { cn } from "../classNames";
import { useSidebar } from "../../contexts/sidebar-context/SidebarContextProvider";

interface DashboardProps {
    children: ReactNode;
    className?: string;
}

interface ContentProps {
    children: ReactNode;
}

const Dashboard: FC<DashboardProps> & {
    Content: FC<ContentProps>
} = ({
    children,
    className
}) => {
        return (
            <div
                className={cn("w-screen min-h-screen bg-layout-light dark:bg-layout-dark flex ", className)}
            >
                {children}
            </div>
        );
    };

const Content: FC<ContentProps> = ({ children }) => {
    const { isSidebarOpen } = useSidebar()
    return (
        <div
            className={cn("h-full flex-1 relative transition-all duration-150 w-full", {
                "sm:pl-[86px]": !isSidebarOpen,
                "sm:pl-[240px]": isSidebarOpen
            })}
        >
            {children}
        </div>
    )
}

Dashboard.Content = Content

export default Dashboard;
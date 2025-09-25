import type { FC, ReactNode } from "react";
import { cn } from "../classNames";

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
                className={cn("w-screen h-screen bg-layout-light dark:bg-layout-dark flex", className)}
            >
                {children}
            </div>
        );
    };

const Content: FC<ContentProps> = ({ children }) => {
    return (
        <div
            className="h-full overflow-scroll flex-1"
        >
            {children}
        </div>
    )
}

Dashboard.Content = Content

export default Dashboard;
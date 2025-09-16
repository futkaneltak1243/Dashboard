import type { FC, ReactNode } from "react";
import { cn } from "../classNames";

interface DashboardProps {
    children: ReactNode;
    className?: string;
}

const Dashboard: FC<DashboardProps> = ({
    children,
    className
}) => {
    const baseClass = "w-full h-full bg-layout-light dark:bg-layout-dark";
    return (
        <div
            className={cn(baseClass, className)}
        >
            {children}
        </div>
    );
};

export default Dashboard;
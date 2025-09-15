import type { FC, ReactNode } from "react";
import { cn } from "../classNames";

interface DashboardProps {
    children: ReactNode;
    backgroundColor?: string;
    className?: string;
}

const Dashboard: FC<DashboardProps> = ({
    children,
    backgroundColor = "#FFFFFF",
    className
}) => {
    const baseClass = "w-full h-full";
    return (
        <div
            style={{ backgroundColor }}
            className={cn(baseClass, className)}
        >
            {children}
        </div>
    );
};

export default Dashboard;
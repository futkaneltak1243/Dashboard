import { cn } from "../classNames";
import type { FC, ReactNode, ElementType } from "react";

interface SidebarProps {
    className?: string;
    children: ReactNode;
    open: boolean;
}

interface NavItemProps {
    className?: string;
    Icon: ElementType;
    title: string;
    open: boolean;
    selected?: boolean;
    onClick: () => void;
}
interface SeparatorProps {
    className?: string;
}

interface TitleProps {
    className?: string;
    label: string;
    open: boolean;

}

interface HeaderProps {
    className?: string;
    children: ReactNode;
}

const NavItem: FC<NavItemProps> = ({
    className,
    Icon,
    title,
    open,
    selected,
    onClick,
}) => {
    return (
        <button
            className={cn(
                "w-full h-[50px] flex items-center justify-center relative cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            <div
                className={cn(
                    "h-full flex items-center rounded-[6px] transition-all duration-150",
                    open ? "w-[192px]" : "w-full justify-center",
                    selected && open ? "bg-primary" : ""
                )}
            >
                <Icon
                    className={cn(
                        "mx-[16px] w-[22px] h-[26px] transition-all duration-150",
                        {
                            "text-white dark:text-white ": selected && open,
                            "text-primary": selected && !open,
                            "text-black dark:text-white": !selected && open,
                            "text-gray-400": !selected && !open,
                        }
                    )}
                />
                <p
                    className={cn(
                        "text-[14px] dark:text-white transition-all duration-150",
                        open ? "" : "hidden",
                        selected ? "text-white" : "text-[#202224]"
                    )}
                >
                    {title}
                </p>
            </div>

            <div
                className={cn(
                    "w-[9px] h-full absolute top-0 left-[-5px] bg-primary rounded-full",
                    selected ? "block" : "hidden"
                )}
            />
        </button>
    );
};

const Separator: FC<SeparatorProps> = ({ className }) => {
    return (
        <div className={cn("w-full h-[1px] my-[16px] bg-lightgray dark:bg-darkgray", className)}>

        </div>
    )
}

const Header: FC<HeaderProps> = ({ className, children }) => {
    return (
        <div className={cn("w-full h-[80px] flex items-center justify-center", className)}>
            {children}
        </div>
    )

}

const Title: FC<TitleProps> = ({ className, label, open }) => {
    return (
        <p className={cn("text-darkgray text-[12px] mb-[16px] ml-[40px] dark:text-white", className,
            {
                'hidden': !open
            }
        )}>
            {label}
        </p>
    )
}

interface SidebarCompound extends FC<SidebarProps> {
    NavItem: FC<NavItemProps>;
    Header: FC<HeaderProps>;
    Separator: FC<SeparatorProps>;
    Title: FC<TitleProps>;
}

const Sidebar: FC<SidebarProps> & {
    NavItem: FC<NavItemProps>;
    Header: FC<HeaderProps>;
    Separator: FC<SeparatorProps>;
    Title: FC<TitleProps>;
} = (({ className, children, open }) => {
    return (
        <div
            className={cn(
                "h-screen overflow-auto bg-white dark:bg-items-dark shadow-2xl transition-all duration-150",
                open ? "w-[240px]" : "w-[86px]",
                className
            )}
        >
            {children}
        </div>
    );
}) as SidebarCompound;

Sidebar.NavItem = NavItem;
Sidebar.Header = Header;
Sidebar.Separator = Separator;
Sidebar.Title = Title;

export default Sidebar;
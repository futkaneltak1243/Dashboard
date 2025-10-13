import { X } from "lucide-react";
import { useSidebar } from "../../contexts/sidebar-context/SidebarContextProvider";
import { cn } from "../classNames";
import type { FC, ReactNode, ElementType } from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
    className?: string;
    children: ReactNode;
}

interface NavItemProps {
    className?: string;
    Icon: ElementType;
    title: string;
    to: string;
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


const NavItem: FC<NavItemProps> = ({ className, Icon, title, to }) => {
    const { isSidebarOpen } = useSidebar();

    return (
        <NavLink
            to={to}
            className={
                cn(
                    "w-full h-[50px] flex items-center justify-center relative cursor-pointer",
                    className
                )
            }
        >
            {({ isActive }) => (
                <>
                    <div
                        className={cn(
                            "h-full flex items-center rounded-[6px] transition-all duration-150",
                            isSidebarOpen ? "w-[192px]" : "w-full justify-center",
                            isActive && isSidebarOpen ? "bg-primary" : ""
                        )}
                    >
                        <Icon
                            className={cn(
                                "mx-[16px] w-[22px] h-[26px] transition-all duration-150",
                                {
                                    "text-white dark:text-white ": isActive && isSidebarOpen,
                                    "text-primary": isActive && !isSidebarOpen,
                                    "text-black dark:text-white": !isActive && isSidebarOpen,
                                    "text-gray-400": !isActive && !isSidebarOpen,
                                }
                            )}
                        />
                        <p
                            className={cn(
                                "text-[14px] dark:text-white transition-all duration-150",
                                isSidebarOpen ? "" : "hidden",
                                isActive ? "text-white" : "text-[#202224]"
                            )}
                        >
                            {title}
                        </p>
                    </div>

                    <div
                        className={cn(
                            "w-[9px] h-full absolute top-0 left-[-5px] bg-primary rounded-full",
                            isActive ? "block" : "hidden"
                        )}
                    />
                </>
            )}
        </NavLink>
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
} = (({ className, children }) => {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebar()
    return (
        <div
            className={cn(
                "h-screen overflow-auto bg-items-light dark:bg-items-dark shadow-md transition-all duration-150 -translate-x-full  fixed top-0 w-[240px] left-0 z-30 sm:translate-0 sm:w-[86px]",
                className,
                {
                    " sm:w-[240px] translate-x-0": isSidebarOpen
                }
            )}
        >
            {isSidebarOpen &&
                <button
                    className="absolute top-3 right-3 cursor-pointer sm:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <X className="text-black dark:text-white" />
                </button>}
            {children}
        </div>
    );
}) as SidebarCompound;

Sidebar.NavItem = NavItem;
Sidebar.Header = Header;
Sidebar.Separator = Separator;
Sidebar.Title = Title;

export default Sidebar;
import type { ElementType, FC, ReactNode } from "react";
import { TriggerWithPopover } from "../TriggerWithPopover"
import { ChevronDown } from "lucide-react"
import { cn } from "../classNames"

interface DropdownProps {
    children: ReactNode;
}

interface ButtonProps {
    label: string;
    className?: string;
    Icon?: ElementType;
}

interface MenuProps {
    className?: string;
    children: ReactNode;
}

interface MenuItemProps {
    label: string;
    className?: string;
    onClick?: () => void;
    Icon?: ElementType;
}

const Dropdown: FC<DropdownProps> & {
    Button: FC<ButtonProps>,
    Menu: FC<MenuProps>,
    MenuItem: FC<MenuItemProps>
} = ({ children }) => {
    return <TriggerWithPopover>{children}</TriggerWithPopover>
}

const Button: FC<ButtonProps> = ({ className, label, Icon }) => {
    return (
        <TriggerWithPopover.Trigger>
            <button className={cn("flex justify-around items-center bg-layout-light dark:bg-items-dark2 dark:text-lightgray text-darkgray px-5 py-2 rounded-md border border-lightgray dark:border-darkgray min-w-[170px]", className)}>
                <div className="flex items-center">
                    {Icon && <Icon className="mr-4" />}
                    {label}
                </div>
                <ChevronDown className="ml-2" />
            </button>
        </TriggerWithPopover.Trigger>
    )
}

const Menu: FC<MenuProps> = ({ className, children }) => {
    return (
        <TriggerWithPopover.Popover
            className={cn("flex flex-col items-start w-[150px] bg-layout-light dark:bg-items-dark2 dark:text-lightgray text-darkgray rounded-md border border-lightgray dark:border-darkgray divide-y divide-lightgray dark:divide-darkgray ", className)}
        >
            {children}
        </TriggerWithPopover.Popover>
    )
}

const MenuItem: FC<MenuItemProps> = ({ label, className, onClick, Icon }) => {
    return (
        <button className={cn("flex cursor-pointer items-center w-full text-left pl-3 h-[40px] dark:hover:bg-gray-600", className)} onClick={onClick}>
            {Icon && <Icon className="mr-3" />}
            {label}
        </button>
    )
}
Dropdown.Button = Button
Dropdown.Menu = Menu
Dropdown.MenuItem = MenuItem
export default Dropdown
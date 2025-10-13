import type { ElementType, FC, ReactNode } from "react"
import { TriggerWithPopover } from "../TriggerWithPopover";
import { ChevronDown } from "lucide-react"
import { cn } from "../classNames"

interface AccountMenuProps {
    name: string;
    role: string;
    avatar: string;
    children?: ReactNode;
    className?: string;
}

interface ItemProps {
    Icon: ElementType,
    label: string,
    onClick: () => void;
}

const AccountMenu: FC<AccountMenuProps> & {
    Item: FC<ItemProps>
} = ({ name, role, avatar, children, className }) => {
    return (
        <TriggerWithPopover className={cn("flex", className)}>
            <TriggerWithPopover.Trigger>
                <div className="flex items center">
                    <div className="mr-0 md:mr-[16px]">
                        <img
                            src={avatar}
                            className="w-[44px] h-[44px] rounded-full object-cover"
                        ></img>
                    </div>
                    <div className=" hidden md:flex">
                        <div className="mr-[26px] flex flex-col items-start justify-around">
                            <p className="text-sm font-semibold text-text-light dark:text-text-dark">{name}</p>
                            <p className="text-xs text-text-light dark:text-text-dark">{role}</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-[20px] h-[20px] border border-midgray  rounded-full flex items-center justify-center">
                                <ChevronDown size={15} className="text-black dark:text-white"></ChevronDown>
                            </div>
                        </div>
                    </div>
                </div>
            </TriggerWithPopover.Trigger>
            <TriggerWithPopover.Popover z={50}>
                <div className="w-[205px] divide-y-[1px] divide-lightgray dark:divide-darkgray bg-items-light dark:bg-items-dark rounded-xl shadow-lg">
                    {children}
                </div>
            </TriggerWithPopover.Popover>
        </TriggerWithPopover>
    )
}


const Item: FC<ItemProps> = ({ Icon, label, onClick }) => {


    return (
        <button onClick={onClick} className="w-full cursor-pointer">
            <div className="h-[44px] flex items-center">
                <div className="ml-[20px] mr-[10px]">

                    <Icon size={20} className="text-black dark:text-white" />

                </div>
                <div className="text-sm text-text-light dark:text-text-dark">
                    {label}
                </div>

            </div>
        </button>
    )

}

AccountMenu.Item = Item
export default AccountMenu
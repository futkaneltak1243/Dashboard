import type { FC, ReactNode, ElementType } from "react"
import { TriggerWithPopover } from "../TriggerWithPopover";
import { Bell } from "lucide-react"
import { cn } from "../classNames"

interface NotificationProps {
    children?: ReactNode;
    notificationCount?: number;
    className?: string;
}

interface ItemProps {
    Icon: ElementType;
    title: string;
    desicription: string;
    onClick?: () => void;
}

const Notification: FC<NotificationProps> & {
    Item: FC<ItemProps>,
} = ({ children, className, notificationCount = 0 }) => {
    return (
        <TriggerWithPopover className={cn("flex", className)}>
            <TriggerWithPopover.Trigger>
                <div className="relative">
                    <Bell className="text-primary" />
                    <div className={cn("absolute w-[17px] h-[17px] bg-[#979797] text-white items-center justify-center top-[-4px] right-[-4px] hidden rounded-full text-[10px]",
                        {
                            "flex": notificationCount > 0
                        }
                    )}>
                        {(notificationCount < 100) ? notificationCount : "+99"}
                    </div>

                </div>
            </TriggerWithPopover.Trigger>
            <TriggerWithPopover.Popover>
                <div className="bg-items-light dark:bg-items-dark rounded-2xl w-[254px] shadow-lg" >
                    <p className="text-sm py-[14px] text-text-light dark:text-text-dark pl-[20px]">Notification</p>
                    <div className="h-[1px] bg-darkgray dark:bg-lightgray"></div>
                    <div className="h-[240px] overflow-y-scroll">
                        {children}
                    </div>
                    <div className="h-[1px] bg-darkgray dark:bg-lightgray"></div>
                    <p className="py-[14px] text-darkgray dark:text-lightgray text-center text-xs">See all notification</p>
                </div>
            </TriggerWithPopover.Popover>
        </TriggerWithPopover>
    )
}


const Item: FC<ItemProps> = ({ Icon, title, desicription, onClick }) => {
    return (
        <button onClick={onClick} className="w-full cursor-pointer">
            <div className="w-full flex items-center  h-[60px] py-[12px]">
                <div className="ml-[20px] mr-[12px]">
                    <Icon className="dark:text-white" />
                </div>
                <div className="text-left">
                    <h2 className="text-sm text-text-light dark:text-text-dark">{title}</h2>
                    <p className="text-xs text-midgray">{desicription}</p>


                </div>
            </div>
        </button>
    )
}

Notification.Item = Item
export default Notification
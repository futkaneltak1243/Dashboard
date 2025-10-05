import type { ReactNode, FC, ElementType } from "react"
import { cn } from "../classNames"

interface ActionButtonsProps {
    children: ReactNode
}

interface ButtonProps {
    type: "icon" | "text";
    Icon?: ElementType;
    children?: ReactNode;
    size?: "default" | "lg";
    onClick?: () => void;
    iconClass?: string;
    disabled?: boolean
}



const ActionButtons: FC<ActionButtonsProps> & {
    Button: FC<ButtonProps>
} = ({ children }) => {
    return (
        <div
            className="flex items-center border border-lightgray divide-x divide-lightgray rounded-lg overflow-hidden w-fit "
        >
            {children}
        </div>
    )
}

const Button: FC<ButtonProps> = ({ type, Icon, children, size = "default", onClick, iconClass, disabled }) => {
    return (
        <button
            className={cn("cursor-pointer bg-[#FAFBFD] dark:bg-[#323D4E] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#404B5C] transition",
                {

                    "w-[40px] h-[40px]": size === "lg" && type === "icon",
                    "w-[45px] h-[32px]": size === "default" && type === "icon",
                    "px-[17px] h-[40px]": size === "lg" && type === "text",
                    "px-[17px] h-[32px]": size === "default" && type === "text",
                    "cursor-default hover:bg-gray-200 bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-600": disabled
                }
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {
                type === "icon" && Icon ?
                    <Icon
                        className={cn("text-black dark:text-white", iconClass, {
                            "opacity-25": disabled,
                        })}
                        size={18}
                    />
                    : children
            }
        </button>
    )
}
ActionButtons.Button = Button
export default ActionButtons
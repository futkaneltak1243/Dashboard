import { type ReactNode, type FC } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../classNames";
import { Button as Bn } from "../Button";
import { TriggerWithPopover } from "../TriggerWithPopover";

interface FilterProps {
    children: ReactNode;
}

interface ButtonProps {
    className?: string;
    label: string;
}

interface PopoverProps {
    className?: string;
    title: string;
    description: string;
    children: ReactNode;
    buttonClick: () => void;
    buttonLabel: string;
    fullOnSmallScreen?: boolean;
    offsetY?: number;
    offsetX?: number;
}

const Filter: FC<FilterProps> & {
    Button: FC<ButtonProps>,
    Popover: FC<PopoverProps>
} = ({ children }) => {

    return (
        <TriggerWithPopover>
            {children}
        </TriggerWithPopover>
    )
}

const Button: FC<ButtonProps> =
    ({ label, className }) => {
        return (
            <>
                <TriggerWithPopover.Trigger
                    className={cn(
                        "flex items-center justify-center bg-items-light dark:bg-items-dark text-text-light dark:text-text-dark cursor-pointer relative",
                        className
                    )}
                >
                    <div className="p-[26px] flex items-center">
                        <div className="mr-[30px]">{label}</div>
                        <ChevronDown />
                    </div>

                </TriggerWithPopover.Trigger>

            </>
        );
    };


const Popover: FC<PopoverProps> = ({ className, title, description, children, buttonClick, buttonLabel, fullOnSmallScreen = false, offsetY = 0, offsetX = 0 }) => {



    return (
        <TriggerWithPopover.Popover
            className={cn("rounded-xl bg-items-light dark:bg-items-dark2 sm:w-[521px]  absolute shadow-2xl text-text-light dark:text-text-dark",
                className)}
            fullOnSmallScreen={fullOnSmallScreen}
            offsetY={offsetY}
            offsetX={offsetX}
        >
            <h1 className="pt-3 pl-[24px] font-semibold text-xl text-left">
                {title}
            </h1>
            <div className="p-5 flex items-center justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">

                    {children}
                </div>
            </div>
            <div className="h-[1px] w-full my-[16px] bg-midgray"></div>
            <div className="text-midgray mb-[32px] pl-[24px] text-left">
                {description}
            </div>
            <div className="flex items-center justify-center pb-[24px]">
                <TriggerWithPopover.Close>
                    <Bn variant="default" size="md" onClick={buttonClick}>
                        {buttonLabel}
                    </Bn>
                </TriggerWithPopover.Close>
            </div>
        </TriggerWithPopover.Popover>
    )



}

Filter.Button = Button
Filter.Popover = Popover
export default Filter;

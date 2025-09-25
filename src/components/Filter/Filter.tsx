import { type ReactNode, type FC, createContext, useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Funnel, RotateCcw } from "lucide-react";
import { cn } from "../classNames";
import { Button as Bn } from "../Button";
import { TriggerWithPopover } from "../TriggerWithPopover";


type BreakPoint = 'sm' | 'md' | 'lg' | 'xl';

type Placement = "left" | "middle" | "right"

interface FilterProps {
    children: ReactNode;
}

interface ButtonProps {
    className?: string;
    label: string;
    placement?: "left" | "middle" | "right";
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

interface OptionProps {
    className?: string;
    selected: boolean;
    buttonClick?: () => void;
    label: string;
}

interface ActionBoxProps {
    className?: string;
    children: ReactNode;
    placement: Placement;
    breakPoint?: BreakPoint;
}

interface FilterBarProps {
    children?: ReactNode;
    breakPoint: BreakPoint;
}

interface FilterIconBoxProps {
    className?: string;
    placement: Placement;
}

interface FilterRestartActionBoxProps {
    className?: string;
    placement: Placement;
}

const BreakPointContext = createContext<BreakPoint | undefined>(undefined)

const useBreakPoint = () => {
    const context = useContext(BreakPointContext);
    if (context === undefined) throw new Error("FilterBar components must be used inside FilterBar component");
    return context
}

const FilterBar: FC<FilterBarProps> & {
    Filter: FC<FilterProps>,
    Button: FC<ButtonProps>,
    Popover: FC<PopoverProps>,
    Option: FC<OptionProps>
} = ({ children, breakPoint }) => {

    const contextValue: BreakPoint = breakPoint

    return (
        <BreakPointContext.Provider value={contextValue}>
            <div className="flex items-center">
                <div className={cn("hidden items-center", {
                    "sm:flex": breakPoint === "sm",
                    "md:flex": breakPoint === "md",
                    "lg:flex": breakPoint === "lg",
                    "xl:flex": breakPoint === "xl",

                })}>
                    <FilterIconBox placement='left' />
                    {children}

                </div>
                <TriggerWithPopover className={cn("block", {
                    "sm:hidden": breakPoint === "sm",
                    "md:hidden": breakPoint === "md",
                    "lg:hidden": breakPoint === "lg",
                    "xl:hidden": breakPoint === "xl",

                })}>
                    <TriggerWithPopover.Trigger >
                        <FilterIconBox placement='left' />
                    </TriggerWithPopover.Trigger>
                    <TriggerWithPopover.Popover className="z-10" offsetX={50}>
                        <div className="flex flex-col rounded-xl overflow-hidden border border-lightgray divide-lightgray dark:border-darkgray dark:divide-darkgray divide-y">
                            {children}
                        </div>

                    </TriggerWithPopover.Popover>
                </TriggerWithPopover>

                <FilterRestartActionBox placement="right" />
            </div>
        </BreakPointContext.Provider>
    )
}

const FilterRestartActionBox: FC<FilterRestartActionBoxProps> = ({ className, placement }) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center bg-items-light dark:bg-items-dark text-text-light dark:text-text-dark  cursor-pointer relative border-lightgray dark:border-darkgray border h-[70px] text-sm  p-[26px] w-auto",
                className,
                {
                    "rounded-l-lg": placement === "left",
                    "border-l-0": placement === "middle",
                    "border-l-0 rounded-r-lg": placement === "right",

                }
            )}
        >
            <div className='items-center flex justify-center'>
                <RotateCcw size={15} className='mr-3'></RotateCcw>
                Restart Filter
            </div>
        </div>
    )
}

const FilterIconBox: FC<FilterIconBoxProps> = ({ className, placement }) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center bg-items-light dark:bg-items-dark text-text-light dark:text-text-dark  cursor-pointer relative border-lightgray dark:border-darkgray border h-[70px] text-sm  p-[26px] w-auto",
                className,
                {
                    "rounded-l-lg": placement === "left",
                    "border-l-0": placement === "middle",
                    "border-l-0 rounded-r-lg": placement === "right",

                }
            )}
        >
            <Funnel className='w-[16px] h-[16px] md:w-[20px] md:h-[20px]'></Funnel>

        </div>
    )

}

export const ActionBox: FC<ActionBoxProps> = ({ className, children, placement, breakPoint = 'sm' }) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center bg-items-light dark:bg-items-dark text-text-light dark:text-text-dark  cursor-pointer relative  h-12 w-40",
                className,
                {
                    "rounded-l-lg": placement === "left",
                    "border-l-0": placement === "middle",
                    "border-l-0 rounded-r-lg": placement === "right",
                    "sm:h-[70px] sm:text-sm sm:p-[15px] lg:p-[26px] sm:w-auto sm:border sm:border-lightgray sm:dark:border-darkgray": breakPoint === 'sm',
                    "md:h-[70px] md:text-sm md:p-[15px] lg:p-[26px] md:w-auto md:border md:border-lightgray md:dark:border-darkgray": breakPoint === 'md',
                    "lg:h-[70px] lg:text-sm  lg:p-[26px] lg:w-auto lg:border lg:border-lightgray lg:dark:border-darkgray": breakPoint === 'lg',
                    "xl:h-[70px] xl:text-sm  xl:p-[26px] xl:w-auto xl:border xl:border-lightgray xl:dark:border-darkgray": breakPoint === 'xl',


                }
            )}
        >
            {children}
        </div>
    )
}




const Filter: FC<FilterProps> = ({ children }) => {

    return (
        <TriggerWithPopover>
            {children}
        </TriggerWithPopover>
    )
}




const Button: FC<ButtonProps> =
    ({ label, className, placement = "middle" }) => {

        const breakPoint = useBreakPoint()

        return (
            <>
                <TriggerWithPopover.Trigger>
                    <ActionBox className={className} placement={placement} breakPoint={breakPoint}>
                        <div className=" flex items-center h-full">
                            <div className="mr-[0px] md:mr-[20px] sm:mr-[10px]">{label}</div>
                            <ChevronDown className={cn("w-[16px] h-[16px] hidden",
                                {
                                    "sm:block": breakPoint === 'sm',
                                    "md:block": breakPoint === 'md',
                                    "lg:block": breakPoint === 'lg',
                                    "xl:block": breakPoint === 'xl',

                                }
                            )} />
                            <ChevronRight className={cn("w-4 h-4 block",
                                {
                                    "sm:hidden": breakPoint === 'sm',
                                    "md:hidden": breakPoint === 'md',
                                    "lg:hidden": breakPoint === 'lg',
                                    "xl:hidden": breakPoint === 'xl',
                                }
                            )} />
                        </div>
                    </ActionBox>

                </TriggerWithPopover.Trigger>

            </>
        );
    };


const Popover: FC<PopoverProps> = ({ className, title, description, children, buttonClick, buttonLabel, fullOnSmallScreen = false, offsetY = 0, offsetX = 0 }) => {

    const [isScreenSmal, setIsScreenSmall] = useState<boolean>(false)
    const breakPoint = useBreakPoint()



    useEffect(() => {

        let screenSize: number;
        switch (breakPoint) {
            case "sm":
                screenSize = 640;
                break;
            case "md":
                screenSize = 768;
                break;
            case "lg":
                screenSize = 1024;
                break;
            case "xl":
                screenSize = 1280;
                break;
        }

        const handleResize = () => {
            setIsScreenSmall(window.innerWidth < screenSize)
        }

        handleResize();

        window.addEventListener('resize', handleResize)

        return (() => {
            window.removeEventListener('resize', handleResize)
        })
    }, [])

    return (
        <TriggerWithPopover.Popover
            className={cn("rounded-xl bg-items-light dark:bg-items-dark2 sm:w-[375px] md:w-[521px] min-w-[250px]  absolute shadow-2xl text-text-light dark:text-text-dark",
                className)}
            fullOnSmallScreen={fullOnSmallScreen}
            offsetY={offsetY}
            offsetX={isScreenSmal ? offsetX + 4 : offsetX}
            side={isScreenSmal}
        >
            <h1 className="pt-3 pl-[24px] font-semibold text-lg text-left">
                {title}
            </h1>
            <div className="p-5 flex items-center justify-center">
                <div className="grid  gap-4 max-h-[230px] overflow-y-scroll grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {children}
                </div>
            </div>
            <div className="h-[1px] w-full mb-[16px] bg-midgray"></div>
            <div className="text-midgray mb-[32px] pl-[24px] text-left text-sm">
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

const Option: FC<OptionProps> = ({ className, label, buttonClick, selected }) => {
    return (
        <button
            className={cn(" w-[147px] h-[34px] cursor-pointer rounded-full border dark:border-midgray border-darkgray text-text-light dark:text-text-dark text-xs md:text-sm",
                className,
                {
                    "bg-primary border-none text-white": selected
                }
            )}
            onClick={buttonClick}
        >
            {label}
        </button>
    )
}


FilterBar.Filter = Filter;
FilterBar.Button = Button;
FilterBar.Popover = Popover;
FilterBar.Option = Option

export default FilterBar;

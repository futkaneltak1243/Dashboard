import { type ReactNode, type FC, createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Funnel, RotateCcw } from "lucide-react";
import { cn } from "../classNames";
import { Button as Bn } from "../Button";
import { TriggerWithPopover } from "../TriggerWithPopover";
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, startOfMonth, startOfWeek, subMonths } from "date-fns"


type BreakPoint = 'sm' | 'md' | 'lg' | 'xl';


interface FilterProps {
    children: ReactNode;
}

interface ButtonProps {
    className?: string;
    label: string;
}


interface DateButtonProps {
    className?: string;
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
    onClick?: () => void;
    label: string;
}

interface ActionBoxProps {
    className?: string;
    children: ReactNode;
    breakPoint?: BreakPoint;
}

interface FilterBarProps {
    children?: ReactNode;
    breakPoint: BreakPoint;
    resetButtonClick?: () => void;
}

interface FilterIconBoxProps {
    className?: string;
}

interface FilterResetActionBoxProps {
    className?: string;
    onClick?: () => void
}

interface DateFilterProps {
    children: ReactNode;
}

interface DatePopoverProps {
    className?: string;
    description: string;
    buttonClick: () => void;
    buttonLabel: string;
    fullOnSmallScreen?: boolean;
    offsetY?: number;
    offsetX?: number;
    chosenDates: Date[];
    setChosenDates: Dispatch<SetStateAction<Date[]>>
}

interface IChosenDateContext {
    chosenDate: string;
    setChosenDate: (chosenDate: string) => void
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
    Option: FC<OptionProps>,
    DateFilter: FC<DateFilterProps>,
    DateButton: FC<DateButtonProps>,
    DatePopover: FC<DatePopoverProps>
} = ({ children, breakPoint, resetButtonClick }) => {

    const contextValue: BreakPoint = breakPoint

    return (
        <BreakPointContext.Provider value={contextValue}>
            <div className="flex items-center border border-lightgray dark:border-darkgray w-fit rounded-xl overflow-hidden divide-x divide-lightgray dark:divide-darkgray">
                <div className={cn("hidden items-center divide-x divide-lightgray dark:divide-darkgray", {
                    "sm:flex": breakPoint === "sm",
                    "md:flex": breakPoint === "md",
                    "lg:flex": breakPoint === "lg",
                    "xl:flex": breakPoint === "xl",

                })}>
                    <FilterIconBox />
                    <FilterByBox />
                    {children}

                </div>
                <TriggerWithPopover className={cn("block", {
                    "sm:hidden": breakPoint === "sm",
                    "md:hidden": breakPoint === "md",
                    "lg:hidden": breakPoint === "lg",
                    "xl:hidden": breakPoint === "xl",

                })}>
                    <TriggerWithPopover.Trigger >
                        <FilterIconBox />
                    </TriggerWithPopover.Trigger>
                    <TriggerWithPopover.Popover className="z-10" offsetX={50}>
                        <div className="flex flex-col rounded-xl overflow-hidden border border-lightgray divide-lightgray dark:border-darkgray dark:divide-darkgray divide-y">
                            {children}
                        </div>

                    </TriggerWithPopover.Popover>
                </TriggerWithPopover>

                <FilterResetActionBox onClick={resetButtonClick} />
            </div>
        </BreakPointContext.Provider>
    )
}

const FilterResetActionBox: FC<FilterResetActionBoxProps> = ({ className, onClick }) => {
    return (
        <button
            className={cn(
                "flex items-center justify-center bg-[#F9F9FB] dark:bg-items-dark text-text-light dark:text-text-dark  cursor-pointer relative  h-[70px] text-sm  p-[26px] w-auto",
                className)}
            onClick={onClick}
        >
            <div className='items-center flex justify-center'>
                <RotateCcw size={15} className='mr-3'></RotateCcw>
                Reset Filter
            </div>
        </button>
    )
}

const FilterIconBox: FC<FilterIconBoxProps> = ({ className }) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center bg-[#F9F9FB] dark:bg-items-dark text-text-light dark:text-text-dark  cursor-pointer relative h-[70px] text-sm  p-[26px] w-auto",
                className)}
        >
            <Funnel className='w-[16px] h-[16px] md:w-[20px] md:h-[20px]'></Funnel>

        </div>
    )

}

const FilterByBox: FC = () => {
    return (
        <div
            className={cn(
                "flex items-center justify-center bg-[#F9F9FB] dark:bg-items-dark text-text-light dark:text-text-dark  cursor-pointer relative h-[70px] text-sm  p-[26px] w-auto ",
            )}
        >
            Filter By
        </div>
    )
}

export const ActionBox: FC<ActionBoxProps> = ({ className, children, breakPoint = 'sm' }) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center bg-[#F9F9FB] dark:bg-items-dark text-text-light dark:text-text-dark  cursor-pointer relative  h-12 w-40",
                className,
                {

                    "sm:h-[70px] sm:text-sm sm:p-[15px] lg:p-[26px] sm:w-auto ": breakPoint === 'sm',
                    "md:h-[70px] md:text-sm md:p-[15px] lg:p-[26px] md:w-auto ": breakPoint === 'md',
                    "lg:h-[70px] lg:text-sm  lg:p-[26px] lg:w-auto ": breakPoint === 'lg',
                    "xl:h-[70px] xl:text-sm  xl:p-[26px] xl:w-auto ": breakPoint === 'xl',


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
    ({ label, className }) => {

        const breakPoint = useBreakPoint()

        return (
            <>
                <TriggerWithPopover.Trigger>
                    <ActionBox className={className} breakPoint={breakPoint}>
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

    const [isScreenSmall, setIsScreenSmall] = useState<boolean>(false)
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
            offsetX={isScreenSmall ? offsetX + 4 : offsetX}
            side={isScreenSmall}
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

const Option: FC<OptionProps> = ({ className, label, onClick, selected }) => {
    return (
        <button
            className={cn(" w-[147px] h-[34px] cursor-pointer rounded-full border dark:border-midgray border-darkgray text-text-light dark:text-text-dark text-xs md:text-sm",
                className,
                {
                    "bg-primary border-none text-white": selected
                }
            )}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

const ChosenDateContext = createContext<IChosenDateContext | undefined>(undefined)

const useChosenDate = () => {
    const context = useContext(ChosenDateContext);
    if (context === undefined) throw new Error("DateButton and DatePopover should be used within dateFilter Component");
    return context
}

const DateFilter: FC<DateFilterProps> = ({ children }) => {
    const [chosenDate, setChosenDate] = useState<string>("")
    return (
        <ChosenDateContext.Provider value={{ chosenDate, setChosenDate }}>
            <TriggerWithPopover>
                {children}
            </TriggerWithPopover>
        </ChosenDateContext.Provider>
    )
}


const DateButton: FC<DateButtonProps> = ({ className }) => {
    const { chosenDate } = useChosenDate()
    return <Button label={chosenDate || "Date"} className={className} />
}

const DatePopover: FC<DatePopoverProps> = ({ className, description, buttonClick, buttonLabel, fullOnSmallScreen = false, offsetY = 0, offsetX = 0, chosenDates, setChosenDates }) => {

    const [isScreenSmall, setIsScreenSmall] = useState<boolean>(false)
    const breakPoint = useBreakPoint()
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const toggleDay = (day: Date) => {
        setChosenDates((prev: Date[]) => {
            const exists = prev.some((d: Date) => isSameDay(d, day))

            if (exists) {
                return prev.filter((d: Date) => !isSameDay(d, day))
            }
            return [...prev, day]
        })
    }

    const renderDays = () => {
        const startDay = startOfWeek(startOfMonth(currentMonth))
        const endDay = endOfWeek(endOfMonth(currentMonth))
        const days = eachDayOfInterval({ start: startDay, end: endDay })

        return (days.map((day: Date) => {
            return (
                <div
                    key={day.toString()}
                    className={cn("text-center text-text-light p-[8px] sm:p-[11px] rounded-md dark:text-text-dark cursor-pointer",
                        {
                            "bg-primary text-white": chosenDates.some((d) => isSameDay(d, day))
                        }
                    )}
                    onClick={() => toggleDay(day)}

                >
                    {format(day, "d")}
                </div>
            )
        }))

    }

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
            className={cn("rounded-xl bg-items-light dark:bg-items-dark2 sm:w-[387px] min-w-[270px]   absolute shadow-2xl text-text-light dark:text-text-dark",
                className)}
            fullOnSmallScreen={fullOnSmallScreen}
            offsetY={offsetY}
            offsetX={isScreenSmall ? offsetX + 4 : offsetX}
            side={isScreenSmall}
        >
            <div className="py-[25px] px-[31px] flex items-center justify-between">
                <h1 className=" font-semibold text-sm text-left">{format(currentMonth, "MMMM yyyy")}</h1>
                <div className="flex">
                    <button
                        className="w-[22px] h-[22px] bg-[#E7E9EE] dark:bg-[#475365] mr-[12px] rounded-sm flex items-center justify-center cursor-pointer"
                        onClick={() => { setCurrentMonth(subMonths(currentMonth, 1)) }}
                    >
                        <ChevronLeft className="text-black dark:text-lightgray" />
                    </button>
                    <button
                        className="w-[22px] h-[22px] bg-[#E7E9EE] dark:bg-[#475365] rounded-sm flex items-center justify-center cursor-pointer"
                        onClick={() => { setCurrentMonth(addMonths(currentMonth, 1)) }}
                    >
                        <ChevronRight className="text-black dark:text-lightgray" />

                    </button>
                </div>

            </div>

            <div className="h-[1px] w-full mb-[16px] bg-midgray"></div>

            <div className="pb-5 px-[15px] sm:px-[37px] items-center justify-center grid grid-cols-7 gap-[1px] sm:gap-[2px]">
                {"SMTWTFS".split("").map((c: string, index) => {
                    return <div key={index} className="text-center mb-[3px]">{c}</div>
                })}
                {renderDays()}
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

FilterBar.DatePopover = DatePopover
FilterBar.Filter = Filter;
FilterBar.Button = Button;
FilterBar.Popover = Popover;
FilterBar.Option = Option;
FilterBar.DateFilter = DateFilter;
FilterBar.DateButton = DateButton

export default FilterBar;

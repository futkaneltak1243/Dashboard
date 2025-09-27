import type { ReactNode, FC } from "react"
import { TriggerWithPopover } from "../TriggerWithPopover"

interface DatePickerProps {
    children: ReactNode;
}

interface ButtonProps {
    children: ReactNode
}

interface PopoverProps {
    selectedDates: string[]
    setSelectedDates: React.Dispatch<React.SetStateAction<string[]>>
    className?: string;
    fullOnSmallScreen?: boolean;
    offsetY?: number;
    offsetX?: number;

}

const DatePicker: FC<DatePickerProps> & {
    Button: FC<ButtonProps>
} = ({ children }) => {
    return <TriggerWithPopover>{children}</TriggerWithPopover>
}


const Button: FC<ButtonProps> = ({ children }) => {
    return <TriggerWithPopover.Trigger>{children}</TriggerWithPopover.Trigger>
}

const Popover: FC<PopoverProps> = ({ selectedDates, setSelectedDates, }) => {

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

DatePicker.Button = Button
export default DatePicker
import type { FC, ElementType, ReactNode } from "react"
import { cn } from "../classNames"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cva } from "class-variance-authority"

interface StatCardProps {
    className?: string;
    title: string;
    value: string;
    iconColor?: "blue" | "yellow" | "green" | "orange";
    Icon: ElementType;
    direction: "up" | "down";
    percent: number;
    lastDifference: string;
}

interface StatGridProps {
    children: ReactNode
}

const iconContainerVariants = cva(
    "md-stats:w-[60px] md-stats:h-[60px] w-[42px] h-[42px] md-stats:rounded-3xl rounded-2xl flex items-center justify-center ",
    {
        variants: {
            iconColor: {
                blue: "dark:bg-[#8280FF] bg-[#8280FF33]",
                yellow: "dark:bg-[#FEC53D] bg-[#FEC53D33]",
                green: "dark:bg-[#4AD991 bg-[#4AD99133]",
                orange: "dark:bg-[#FF9066] bg-[#FF906633]"
            }
        },
        defaultVariants: {
            iconColor: "blue"
        }
    }
)

const iconVariants = cva(
    "md-stats:w-[32px] md-stats:h-[32px] w-[25px] h-[25px] dark:text-white opacity-100",
    {
        variants: {
            iconColor: {
                blue: "text-[#8280FF]",
                yellow: "text-[#FEC53D]",
                green: "text-[#4AD991]",
                orange: "text-[#FF9066]"
            }
        },
        defaultVariants: {
            iconColor: "blue"
        }
    }
)

const StatCard: FC<StatCardProps> = ({ title, value, className, direction, percent, lastDifference, Icon, iconColor }) => {
    return (
        <div className={cn("md-stats:w-[262px] md-stats:h-[161px] m-w-[196px] min-w-[140px] h-[120px] rounded-2xl bg-items-light dark:bg-items-dark shadow-sm md-stats:p-[16px] p-[10px] flex flex-col items-start justify-between hover:-translate-y-2 transition-all duration-300",
            className
        )}>
            <div className="flex items-start justify-between w-full">
                <div>
                    <p className="text-darkgray dark:text-midgray md-stats:text-base md-stats:mb-[16px] mb-[7px] text-sm">{title}</p>
                    <p className="md-stats:text-3xl font-semibold text-text-light dark:text-text-dark text-xl">{value}</p>
                </div>
                <div className={iconContainerVariants({ iconColor })}>
                    <Icon className={iconVariants({ iconColor })} />
                </div>

            </div>
            <div className="flex w-full">
                <div className="mr-[8px] ">
                    {(direction === "up") ? <TrendingUp className="text-[#00B69B]" /> : <TrendingDown className="text-[#F93C65]" />}
                </div>
                <p className="md-stats:text-sm text-xs" >
                    <span className={cn("mr-1 text-[#00B69B]", {
                        "text-[#F93C65]": direction === "down"
                    })}>{percent}%</span>
                    <span className="text-darkgray dark:text-white">
                        {direction === "up" ? "Up" : "Down"} from {lastDifference}
                    </span>
                </p>

            </div>

        </div>
    )

}

const StatGrid: FC<StatGridProps> & {
    StatCard: FC<StatCardProps>
} = ({ children }) => {
    return (
        <div className="flex items center justify-center w-full">
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 mx-2 gap-[15px] lg:gap-[30px]">
                {children}
            </div>

        </div>

    )
}

StatGrid.StatCard = StatCard
export default StatGrid
import type { FC, ReactNode } from "react";
import { cn } from "../classNames"

interface TableProps {
    children: ReactNode;
    className?: string;
}

interface HeadRowProps {
    children: ReactNode;
    className?: string;
}

interface HeadCellProps {
    children: ReactNode;
    className?: string;
    centered?: boolean
}

interface RowProps {
    children: ReactNode;
    className?: string;
}

interface CellProps {
    children: ReactNode;
    className?: string;
    centered?: boolean
}

interface StatusProps {
    children?: ReactNode;
    className?: string;
    color: "green" | "red" | "blue" | "yellow"
}

interface HeadProps {
    children: ReactNode;
}
interface BodyProps {
    children: ReactNode
}

const Head: FC<HeadProps> = ({ children }) => {
    return <thead>{children}</thead>
}

const Body: FC<BodyProps> = ({ children }) => {
    return <tbody className="divide-y divide-lightgray dark:divide-darkgray">{children}</tbody>
}

const HeadRow: FC<HeadRowProps> = ({ children, className }) => {
    return (
        <tr
            className={cn("bg-items-light dark:bg-items-dark2 h-[48px] ", className)}
        >
            {children}
        </tr>
    )
}

const HeadCell: FC<HeadCellProps> = ({ children, className, centered = false }) => {
    return (
        <th
            className={cn(" pr-3 text-left font-semibold", className,
                {
                    "pl-5": !centered,
                    "text-center": centered
                }
            )}
        >
            {children}
        </th>
    )
}

const Row: FC<RowProps> = ({ children, className }) => {
    return (
        <tr
            className={cn("bg-items-light dark:bg-items-dark h-[90px]", className)}
        >
            {children}
        </tr>
    )
}


const Cell: FC<CellProps> = ({ children, className, centered }) => {
    return (
        <td
            className={cn(" pr-3 max-w-[180px] max-h-[90px] whitespace-normal break-words truncate ",
                className,
                {
                    "pl-5": !centered
                }
            )}
            align={centered ? "center" : "left"}
        >
            <div className="line-clamp-3 text-sm">
                {children}
            </div>
        </td>
    )
}

const Status: FC<StatusProps> = ({ children, color, className }) => {
    return (
        <div className={cn(
            "max-w-[93px] h-[29px] p-2 rounded-[4.5px] flex items-center justify-center text-xs",
            className, {
            "bg-[#00B69B]/20 dark:bg-[#00B69B] dark:text-white  text-[#00B69B]": color === "green",
            "bg-[#6226EF]/20 dark:bg-[#6226EF] dark:text-white text-[#6226EF]": color === "blue",
            "bg-[#FFA756]/20 dark:bg-[#FFA756] dark:text-white  text-[#FFA756]": color === "yellow",
            "bg-[#EF3826]/20 dark:bg-[#EF3826] dark:text-white   text-[#EF3826]": color === "red",
        })}>
            {children}
        </div>
    )
}


const Table: FC<TableProps> & {
    Head: FC<HeadProps>,
    Body: FC<BodyProps>,
    HeadRow: FC<HeadRowProps>,
    HeadCell: FC<HeadCellProps>,
    Row: FC<RowProps>,
    Cell: FC<CellProps>,
    Status: FC<StatusProps>
} = ({ children, className }) => {
    return (
        <div className="rounded-lg border border-lightgray dark:border-darkgray  w-full overflow-x-auto ">
            <table className={cn(
                "bg-items-light dark:bg-items-dark w-full divide-y  divide-lightgray dark:divide-darkgray text-text-light dark:text-text-dark text-xs sm:text-base",
                className
            )}>
                {children}
            </table>
        </div>
    )
}

Table.Head = Head
Table.Body = Body
Table.HeadRow = HeadRow
Table.HeadCell = HeadCell
Table.Row = Row
Table.Cell = Cell
Table.Status = Status

export default Table
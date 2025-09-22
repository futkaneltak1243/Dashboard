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
}

interface RowProps {
    children: ReactNode;
    className?: string;
}

interface CellProps {
    children: ReactNode;
    className?: string;
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

const HeadCell: FC<HeadCellProps> = ({ children, className }) => {
    return (
        <th
            className={cn("pl-5 pr-3 text-left font-semibold", className,)}
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


const Cell: FC<CellProps> = ({ children, className }) => {
    return (
        <td
            className={cn("pl-5 pr-3 max-w-[180px] max-h-[90px] whitespace-normal break-words truncate ",
                className
            )}
        >
            <div className="line-clamp-3 ">
                {children}
            </div>
        </td>
    )
}

const Status: FC<StatusProps> = ({ children, color, className }) => {
    return (
        <div className={cn(
            "max-w-[93px] h-[29px] p-2 rounded-[4.5px] flex items-center justify-center",
            className, {
            "bg-green-300": color === "green",
            "bg-blue-500": color === "blue",
            "bg-yellow-200": color === "yellow",
            "bg-red-500": color === "red",
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
        <div className="rounded-lg border border-lightgray dark:border-darkgray  max-w-full overflow-x-auto ">
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
import type { Dispatch, FC, ReactNode, SetStateAction } from "react"
import { Dialog } from "../Dialog"
import { X } from "lucide-react";

interface InvoiceDialogProps {
    children: ReactNode;
    open?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

interface TriggerProps {
    children: ReactNode;
}

interface BodyProps {
    title: string;
    description: string;
    name: string;
    email: string;
    address: string;
    orderId: string;
    date: string;
    status: ReactNode;
    children?: ReactNode;
    total: number;
}

interface ItemProps {
    name: string;
    price: number;
}

const InvoiceDialog: FC<InvoiceDialogProps> & {
    Trigger: FC<TriggerProps>,
    Body: FC<BodyProps>,
    Item: FC<ItemProps>
} = ({ children, open, setOpen }) => {
    return <Dialog open={open} setOpen={setOpen}>{children}</Dialog>
}

const Trigger: FC<TriggerProps> = ({ children }) => {
    return <Dialog.Trigger>{children}</Dialog.Trigger>
}

const Body: FC<BodyProps> = ({ title, description, name, email, address, orderId, date, status, children, total }) => {
    return (
        <Dialog.Body className="w-[min(90%,480px)] p-5 bg-items-light dark:bg-items-dark rounded-lg relative text-black dark:text-white">
            <Dialog.Close>
                <X
                    className="absolute top-4 right-4 text-midgray cursor-pointer"
                />
            </Dialog.Close>
            <div>
                <p className="text-lg font-semibold text-text-light dark:text-text-dark">{title}</p>
                <p className="text-sm text-midgray">{description}</p>
            </div>
            <div className="mt-3 flex flex-wrap items-start gap-8 w-full text-sm">
                <div className="flex flex-col items-start gap-1">
                    <p className="mb-2 ">Customer Information</p>
                    <div className="flex items-center flex-wrap">
                        <span className="font-semibold">Name: </span>
                        {name}
                    </div>
                    <div className="flex items-center flex-wrap">
                        <span className="font-semibold">Email: </span>
                        {email}
                    </div>
                    <div className="flex items-center flex-wrap">
                        <span className="font-semibold">Address: </span>
                        {address}
                    </div>
                </div>
                <div className="flex flex-col items-start gap-1">
                    <div className="mb-2 text-sm">Order Information</div>
                    <div className="flex items-center flex-wrap">
                        <span className="font-semibold">Order ID: </span>
                        {orderId}
                    </div>
                    <div className="flex items-center flex-wrap">
                        <span className="font-semibold">Date: </span>
                        {date}
                    </div>
                    <div className="flex items-center">
                        <p className="font-semibold mr-1">Status: </p>
                        {status}

                    </div>

                </div>


            </div>
            <hr className="border-0 h-[1px] bg-lightgray my-4" />
            <div className="h-42 overflow-y-scroll">

                <p className="mb-4 ">Order items</p>
                {children}
            </div>
            <hr className="border-0 h-[1px] bg-lightgray my-3" />
            <div>

            </div>
            <p className="font-semibold">Total: ${total.toFixed(2)}</p>

        </Dialog.Body>
    )
}

const Item: FC<ItemProps> = ({ name, price }) => {
    return (
        <div className="w-full border border-lightgray p-4 flex items-center justify-between rounded-lg mt-3 text-black dark:text-white">
            <p className="text-sm"> {name}</p>
            <p>{price}</p>

        </div>
    )
}

InvoiceDialog.Body = Body
InvoiceDialog.Trigger = Trigger
InvoiceDialog.Item = Item
export default InvoiceDialog
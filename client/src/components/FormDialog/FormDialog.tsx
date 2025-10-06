import type { FC, ReactNode } from "react"
import { Dialog } from "../Dialog"
import { cn } from "../classNames";
import { X } from "lucide-react"
import { Input } from "../Input";

interface FormDialogProps {
    children: ReactNode;
}

interface TriggerProps {
    children: ReactNode;
}

interface BodyProps {
    children: ReactNode;
    className?: string;
    title?: string;
    buttonLabel?: string;
}

interface TextInputProps {
    label?: string;
    value?: string;
    full?: boolean
}

interface SelectInputProps {
    options: string[];
    label?: string;
    value?: string;
}

const FormDialog: FC<FormDialogProps> & {
    Trigger: FC<TriggerProps>,
    Body: FC<BodyProps>,
    TextInput: FC<TextInputProps>,
    SelectInput: FC<SelectInputProps>,
} = ({ children }) => {
    return <Dialog>{children}</Dialog>
}

const Trigger: FC<TriggerProps> = ({ children }) => {
    return <Dialog.Trigger>{children}</Dialog.Trigger>
}

const Body: FC<BodyProps> = ({ children, className, title, buttonLabel }) => {
    return (
        <Dialog.Body
            className={cn("bg-items-light dark:bg-items-dark px-6 pb-6 pt-10 relative shadow-xl w-[min(90%,600px)] rounded-lg",
                className
            )}
        >
            <Dialog.Close>
                <button className="flex items-center justify-center absolute top-4 right-4 cursor-pointer">
                    <X className="text-midgray" />
                </button>
            </Dialog.Close>
            <p
                className="text-2xl text-text-light dark:text-text-dark font-semibold mb-10"
            >
                {title}
            </p>
            <div
                className="grid grid-cols-2 gap-6 w-full"
            >
                {children}
            </div>
            <div className="flex items-center justify-end mt-8">
                <Dialog.Close>
                    <button className=" h-9 w-21 mr-3 border border-lightgray rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-150">
                        Cancel
                    </button>
                </Dialog.Close>
                <Dialog.Close>
                    <button className="bg-primary h-9 w-21 text-white rounded-md cursor-pointer hover:bg-primary-hover transition-colors duration-150">
                        {buttonLabel}
                    </button>
                </Dialog.Close>
            </div>

        </Dialog.Body>
    )
}


const TextInput: FC<TextInputProps> = ({ label, value, full = false }) => {
    return (
        <div className={cn("flex items-start flex-col", {
            "col-span-2": full
        })}>
            <p
                className="mb-2"
            >
                {label}
            </p>
            <Input
                className="h-10 border-gray-300 placeholder:text-gray-400"
                placeholder={label}
                size="full"
                value={value}
            />
        </div>
    )
}

const SelectInput: FC<SelectInputProps> = ({ options, label, value }) => {
    return (
        <div className="col-span-1">
            <p
                className="mb-2"
            >
                {label}
            </p>
            <div className="relative w-full">
                <select
                    className="appearance-none border border-gray-300 rounded-md h-10 w-full pl-3 pr-8"
                    value={value}
                >
                    {options.map((option, index) => (
                        <option key={index}>{option}</option>
                    ))}
                </select>
                {/* Custom arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>

    )
}


FormDialog.Trigger = Trigger
FormDialog.Body = Body
FormDialog.TextInput = TextInput
FormDialog.SelectInput = SelectInput
export default FormDialog
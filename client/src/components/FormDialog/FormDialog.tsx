import type { FC, ReactNode } from "react"
import { Dialog } from "../Dialog"
import { cn } from "../classNames";
import { X, LoaderCircle } from "lucide-react"
import { Input } from "../Input";

interface FormDialogProps {
    children: ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

interface TriggerProps {
    children: ReactNode;
}

interface BodyProps {
    children: ReactNode;
    className?: string;
    title?: string;
    buttonLabel?: string;
    onSubmit?: () => void;
    loading?: boolean;
}

interface TextInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "color" | "size"> {
    label?: string;
    value?: string;
    full?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface SelectInputProps extends Omit<React.ComponentProps<"select">, "onChange"> {
    options: string[];
    label?: string;
    value?: string;
    full?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface DateInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "type"> {
    label?: string;
    value?: string;
    full?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormDialog: FC<FormDialogProps> & {
    Trigger: FC<TriggerProps>,
    Body: FC<BodyProps>,
    TextInput: FC<TextInputProps>,
    SelectInput: FC<SelectInputProps>,
    DateInput: FC<DateInputProps>,
} = ({ children, open, setOpen }) => {
    return <Dialog open={open} setOpen={setOpen}>{children}</Dialog>
}

const Trigger: FC<TriggerProps> = ({ children }) => {
    return <Dialog.Trigger>{children}</Dialog.Trigger>
}

const Body: FC<BodyProps> = ({ children, className, title, buttonLabel, onSubmit, loading = false }) => {
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
                <button
                    className={cn(
                        "h-9 w-21 rounded-md flex items-center justify-center transition-colors duration-150",
                        loading
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed "
                            : "bg-primary text-white hover:bg-primary-hover cursor-pointer "
                    )}
                    onClick={onSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center">
                            <LoaderCircle className="animate-spin w-5 h-5 mr-2" />
                        </div>
                    ) : (
                        buttonLabel
                    )}
                </button>
            </div>

        </Dialog.Body>
    )
}


const TextInput: FC<TextInputProps> = ({ label, value, full = false, onChange, ...props }) => {
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
                onChange={e => onChange?.(e)}
                {...props}
            />
        </div>
    )
}

const SelectInput: FC<SelectInputProps> = ({ options, label, value, onChange, full = false, ...props }) => {
    return (
        <div className={cn("w-full", { "col-span-2": full })}>
            <p
                className="mb-2"
            >
                {label}
            </p>
            <div className="relative w-full">
                <select
                    className="appearance-none border border-gray-300 rounded-md h-10 w-full pl-3 pr-8"
                    value={value}
                    onChange={e => onChange?.(e)}
                    {...props}
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

const DateInput: FC<DateInputProps> = ({ label, value, full = false, onChange, ...props }) => {
    return (
        <div className={cn("flex items-start flex-col", {
            "col-span-2": full,
        })}>
            {label && <p className="mb-2">{label}</p>}
            <input
                type="date"
                className="h-10 border border-gray-300 rounded-md w-full px-3 text-gray-700 
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-primary transition-colors duration-150"
                value={value}
                onChange={e => onChange?.(e)}
                {...props}
            />
        </div>
    );
};


FormDialog.Trigger = Trigger
FormDialog.Body = Body
FormDialog.TextInput = TextInput
FormDialog.SelectInput = SelectInput
FormDialog.DateInput = DateInput
export default FormDialog
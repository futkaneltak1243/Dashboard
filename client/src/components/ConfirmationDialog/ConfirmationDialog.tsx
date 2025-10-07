import type { ElementType, FC, ReactNode } from "react";
import { Dialog } from "../Dialog";
import { cn } from "../classNames";
import { LoaderCircle } from "lucide-react";


interface ConfirmationDialogProps {
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    children: ReactNode
}

interface TriggerProps {
    children: ReactNode;
}

interface BodyProps {
    className?: string;
    title?: string;
    Icon: ElementType;
    iconClass?: string;
    description: string;
    loading: boolean;
    onSubmit: () => void;
    buttonClass?: string;
    buttonLabel?: string;
}

const ConfirmationDialog: FC<ConfirmationDialogProps> & {
    Trigger: FC<TriggerProps>,
    Body: FC<BodyProps>
} = ({ open, setOpen, children }) => {
    return <Dialog open={open} setOpen={setOpen}>{children}</Dialog>
}


const Trigger: FC<TriggerProps> = ({ children }) => {
    return <Dialog.Trigger>{children}</Dialog.Trigger>
}

const Body: FC<BodyProps> = ({ className, title, Icon, iconClass, description, loading, onSubmit, buttonClass, buttonLabel }) => {
    return (
        <Dialog.Body
            className={cn("bg-items-light dark:bg-items-dark px-6 pb-6 pt-10 relative shadow-xl w-[min(90%,600px)] rounded-lg",
                className
            )}
        >

            <div className=" mb-10 flex items-center">
                <Icon
                    className={cn("mr-3", iconClass)}
                />
                <p
                    className="text-2xl text-text-light dark:text-text-dark font-semibold"
                >
                    {title}
                </p>

            </div>

            <div>
                {description}
            </div>
            <div className="flex items-center justify-end mt-8">
                <Dialog.Close>
                    <button className=" h-9 w-21 mr-3 border border-lightgray rounded-md cursor-pointer hover:bg-gray-100 transition-colors duration-150">
                        Cancel
                    </button>
                </Dialog.Close>
                <button
                    className={cn(
                        "h-9 w-21 rounded-md flex items-center justify-center transition-colors duration-150 bg-red-600 text-white hover:bg-red-700 cursor-pointer",
                        buttonClass,
                        {
                            "bg-gray-300 text-gray-500 cursor-not-allowed ": loading
                        }
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

ConfirmationDialog.Trigger = Trigger
ConfirmationDialog.Body = Body

export default ConfirmationDialog



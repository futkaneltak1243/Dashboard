import { Children, cloneElement, createContext, isValidElement, useContext, useState, type ButtonHTMLAttributes, type FC, type MouseEvent, type ReactElement, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useCloseOnEscape } from "../../hooks/useCloseOnEscape";

interface IDialogContext {
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dialogOpen: boolean
}

interface DialogProps {
    children: ReactNode;
}

interface TriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    className?: string;
}

interface OverlayProps {
    children?: ReactNode
}

interface BodyProps {
    children?: ReactNode;
    className: string;
}

interface CloseProps {
    children: ReactElement;
}

const DialogContext = createContext<IDialogContext | undefined>(undefined)

const useDialog = () => {
    const context = useContext(DialogContext);
    if (context === undefined) throw new Error("Dialog components must be used inside a <Dialog> provider");
    return context

}

const Dialog: FC<DialogProps> & {
    Trigger: FC<TriggerProps>,
    Body: FC<BodyProps>,
    Close: FC<CloseProps>
} = ({ children }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const value = {
        dialogOpen,
        setDialogOpen
    }
    return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
}

const Trigger: FC<TriggerProps> = ({ children, className, ...props }) => {
    const { setDialogOpen } = useDialog()
    return (
        <button
            className={className}
            onClick={() => setDialogOpen(p => !p)}
            {...props}
        >
            {children}
        </button>
    )
}

const Overlay: FC<OverlayProps> = ({ children }) => {
    const { setDialogOpen } = useDialog()
    return (
        <div
            className="fixed bg-black/75 h-screen w-screen flex items-center justify-center"
            onClick={() => setDialogOpen(false)}
        >
            {children}
        </div>
    )
}

const Body: FC<BodyProps> = ({ className, children }) => {
    const { dialogOpen, setDialogOpen } = useDialog()
    useCloseOnEscape(() => setDialogOpen(false))
    return dialogOpen && createPortal(
        <Overlay>
            <div className={className}>
                {children}
            </div>
        </Overlay>
        ,
        document.body
    )

}

const Close: FC<CloseProps> = ({ children }) => {
    const { setDialogOpen } = useDialog()
    const child = Children.only(children) as ReactElement<{ onClick?: (event: MouseEvent<HTMLElement>) => void }>;

    if (!isValidElement(child)) {
        console.log("Close component expects a valid React element as a child");
        return null
    }

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        const originalOnClick = child.props.onClick;

        if (typeof originalOnClick === 'function') {
            originalOnClick(event);
        }

        setDialogOpen(false);
    };

    return cloneElement(child, { ...(child.props || {}), onClick: handleClick })

}

Dialog.Trigger = Trigger
Dialog.Body = Body
Dialog.Close = Close
export default Dialog
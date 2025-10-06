import { Children, cloneElement, createContext, isValidElement, useContext, useState, type FC, type MouseEvent, type ReactElement, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useCloseOnEscape } from "../../hooks/useCloseOnEscape";
import { usePreventScroll } from "../../hooks/usePreventScroll";

interface IDialogContext {
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dialogOpen: boolean
}

interface DialogProps {
    children: ReactNode;
}

interface TriggerProps {
    children?: ReactNode;
}

interface OverlayProps {
    children?: ReactNode
}

interface BodyProps {
    children?: ReactNode;
    className?: string;
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

const Trigger: FC<TriggerProps> = ({ children }) => {
    const { setDialogOpen } = useDialog()
    const child = Children.only(children) as ReactElement<{ onClick?: (event: MouseEvent<HTMLElement>) => void }>;

    if (!isValidElement(child)) {
        console.log("Trigger component expects a valid React element as a child");
        return null
    }

    return cloneElement(child, { ...(child.props || {}), onClick: () => setDialogOpen(p => !p) })
}

const Overlay: FC<OverlayProps> = ({ children }) => {
    const { setDialogOpen } = useDialog()
    return (
        <div
            className="fixed top-0 left-0 bg-black/75 h-screen w-screen flex items-center justify-center z-50"
            onClick={() => setDialogOpen(false)}
        >
            {children}
        </div>
    )
}

const Body: FC<BodyProps> = ({ className, children }) => {
    const { dialogOpen, setDialogOpen } = useDialog()
    useCloseOnEscape(() => setDialogOpen(false))
    usePreventScroll(dialogOpen)
    return dialogOpen && createPortal(
        <Overlay>
            <div className={className} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </Overlay>
        ,
        document.querySelector("#root") || document.body
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
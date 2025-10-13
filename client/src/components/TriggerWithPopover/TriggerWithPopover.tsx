import type { ReactNode, FC, ButtonHTMLAttributes, MouseEvent, ReactElement, Dispatch, SetStateAction } from "react"
import { Children, cloneElement, createContext, isValidElement, useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "../classNames"
import { createPortal } from "react-dom";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useCloseOnEscape } from "../../hooks/useCloseOnEscape";




interface TriggerWithPopoverProps {
    children: ReactNode;
    className?: string;
    open?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>
}


interface TriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

interface PopoverProps {
    children: ReactNode;
    className?: string;
    fullOnSmallScreen?: boolean;
    offsetY?: number;
    offsetX?: number;
    side?: boolean;
    z?: number;
}

interface CloseProps {
    children: ReactElement;
}

interface ITriggerWithPopoverContext {
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
    popoverOpen: boolean

}

const TriggerWithPopoverContext = createContext<ITriggerWithPopoverContext | undefined>(undefined)

const useTriggerWithPopover = () => {
    const context = useContext(TriggerWithPopoverContext);
    if (context === undefined) throw new Error("TriggerWithPopover components must be used inside TriggerWithPopover components");
    return context

}

const TriggerWithPopover: FC<TriggerWithPopoverProps> & {
    Trigger: FC<TriggerProps>;
    Popover: FC<PopoverProps>;
    Close: FC<CloseProps>;
} = ({ children, className, open, setOpen }) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    let contextValue: ITriggerWithPopoverContext;
    if (open !== undefined && setOpen) {
        contextValue = {
            popoverOpen: open,
            setPopoverOpen: setOpen,
            triggerRef,
        }
    } else {
        contextValue = {
            popoverOpen,
            setPopoverOpen,
            triggerRef,
        }


    }



    return <TriggerWithPopoverContext.Provider value={contextValue}><div className={className}>{children}</div></TriggerWithPopoverContext.Provider>;
};


const Trigger: FC<TriggerProps> = ({ children, className, onClick, ...rest }) => {
    const { triggerRef, setPopoverOpen } = useTriggerWithPopover()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPopoverOpen(prev => !prev);
        if (onClick) onClick(e);
    };
    return (
        <button
            className={cn("cursor-pointer", className)}
            ref={triggerRef}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </button>
    );
}
    ;

const Popover: FC<PopoverProps> = ({ children, className, fullOnSmallScreen = false, z, offsetY = 0, offsetX = 0, side = false }) => {

    const { triggerRef, setPopoverOpen, popoverOpen } = useTriggerWithPopover()
    const [popoverX, setX] = useState(0)
    const [popoverY, setY] = useState(0)
    const popoverRef = useRef<HTMLDivElement | null>(null)

    useClickOutside(popoverRef, () => setPopoverOpen(false), triggerRef)
    useCloseOnEscape(() => setPopoverOpen(false))


    useEffect(() => {


        if (!popoverOpen) return;

        if (!triggerRef?.current || !popoverRef.current) return;

        const { x, y, width, height } = triggerRef.current.getBoundingClientRect();
        const rect = popoverRef.current.getBoundingClientRect();
        let largeScreenX: number;
        let newY: number;
        if (side) {
            largeScreenX = Math.max(x + window.scrollX + width + offsetX, 0)
            newY = y + window.scrollY
        } else {
            largeScreenX = Math.max(x + window.scrollX + width / 2 - rect.width / 2 + offsetX, 0);
            newY = y + window.scrollY + height + offsetY;
        }
        if (largeScreenX + rect.width > window.innerWidth) {
            largeScreenX = window.innerWidth - rect.width
        }
        const smallScreenX = 0;
        setY(newY);


        if (fullOnSmallScreen) {
            const isLargeScreen = window.innerWidth > 640;
            setX(isLargeScreen ? largeScreenX : smallScreenX);
        } else {
            setX(largeScreenX)
        }



        const handleResize = () => {
            setPopoverOpen(false)
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize)
        };
    }, [popoverOpen, fullOnSmallScreen, setPopoverOpen]);




    return createPortal(
        <div className={cn("absolute", className, {
            "hidden": !popoverOpen,
            "w-full sm:w-fit": fullOnSmallScreen
        })}
            style={{
                top: popoverY,
                left: popoverX,
                zIndex: z ? z : "auto"
            }}
            ref={popoverRef}
        >
            {children}
        </div>,
        document.querySelector("#root") || document.body
    )
}

const Close: FC<CloseProps> = ({ children }) => {
    const { setPopoverOpen } = useTriggerWithPopover()
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

        setPopoverOpen(false);
    };

    return cloneElement(child, { ...(child.props || {}), onClick: handleClick })

}

TriggerWithPopover.Close = Close
TriggerWithPopover.Trigger = Trigger
TriggerWithPopover.Popover = Popover

export default TriggerWithPopover
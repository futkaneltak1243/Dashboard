import { useEffect } from "react";

export default function useClickOutside(
    ref: React.RefObject<HTMLElement | null>,
    callback: () => void,
    ignoreRef?: React.RefObject<HTMLElement | null>
) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                ref.current &&
                !ref.current.contains(target) &&
                (!ignoreRef?.current || !ignoreRef.current.contains(target))
            ) {
                callback();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref, ignoreRef, callback]);
}

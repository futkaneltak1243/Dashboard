import { useEffect } from "react"

export default function usePreventScroll(active: boolean) {
    useEffect(() => {
        if (active) {
            const originalOverflow = document.body.style.overflow
            document.body.style.overflow = "hidden"

            return () => {
                document.body.style.overflow = originalOverflow
            }
        }
    }, [active])
}
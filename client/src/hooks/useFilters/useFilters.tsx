import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";



export default function useFilters<T extends Record<string, any>>() {

    const [searchParams, setSearchParams] = useSearchParams()


    const get = useCallback(
        <K extends keyof T>(
            key: K,
            type: "string" | "number" | "array" = "string"
        ): T[K] => {
            if (type === "array") {
                return searchParams.getAll(key as string) as T[K];
            }

            const value = searchParams.get(key as string);
            if (type === "number") {
                return (Number(value) || 1) as T[K];
            }

            if (value === null) return undefined as T[K];

            return value as T[K];
        },
        [searchParams]
    );

    const setFilters = useCallback((newFilters: Partial<T>) => {
        setSearchParams(() => {
            const params = new URLSearchParams(searchParams);

            if (newFilters.page === undefined) {
                params.set("page", "1")

            }
            for (const key in newFilters) {
                console.log(key)
                const value = newFilters[key]
                if (value === undefined) {
                    continue
                } else if (Array.isArray(value)) {
                    params.delete(key)
                    value.forEach((v: any) => params.append(key, String(v)))
                } else if (value === "") {
                    params.delete(key);
                } else {
                    params.set(key, String(newFilters[key]));
                }

            }
            return params;
        });
    }, [setSearchParams]);

    return { get, setFilters }
}
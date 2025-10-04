import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";



export default function useFilters<T extends Record<string, any>>() {

    const [searchParams, setSearchParams] = useSearchParams()


    const get = useCallback((key: keyof T) => {
        const value = searchParams.getAll(key as string);
        if (value.length > 1) return value;
        if (value.length === 1) return value[0];
        return undefined;
    }, [searchParams])


    const setFilters = useCallback((newFilters: Partial<T>) => {
        setSearchParams(() => {
            const params = searchParams

            for (const key in newFilters) {
                const value = newFilters[key]
                if (value === undefined) continue

                if (Array.isArray(value)) {
                    params.delete(key)
                    value.forEach((v: any) => params.append(key, String(v)))
                }

                if (key === "page") {
                    if (value === undefined) {
                        params.set("page", "1")

                    } else {
                        params.set("page", String(newFilters.page))
                    }
                }

                if (value === "") {
                    params.delete(key);
                } else {
                    params.set(key, String(newFilters[key]));
                }

            }



            return params;
        });
    }, []);



    return { get, setFilters }
}
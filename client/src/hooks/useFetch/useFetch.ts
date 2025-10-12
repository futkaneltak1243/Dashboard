import { useCallback, useEffect, useState } from "react";

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export default function useFetch<T>(url: string | null, options?: RequestInit) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const refetch = useCallback(() => {
        setReloadTrigger(prev => !prev);
    }, []);
    useEffect(() => {

        let isMounted = true;

        const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

        if (!serverDomain) {
            setState({ data: null, loading: false, error: "Server domain is not defined in the environment variables." })
            return;
        }

        async function fetchData() {
            try {
                const res = await fetch(`${serverDomain}${url}`, options);
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                const data = (await res.json()) as T;

                if (isMounted) {
                    setState({ data, loading: false, error: null });
                }
            } catch (err: any) {
                if (isMounted) {
                    setState({ data: null, loading: false, error: err.message });
                }
            }
        }

        if (url) {
            fetchData();

        }

        return () => {
            isMounted = false;
        };
    }, [url, options, reloadTrigger]);

    return { ...state, refetch };
}
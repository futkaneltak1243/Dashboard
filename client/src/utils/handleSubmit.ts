interface HandleSubmitOptions<T> {
    url: string;
    method?: "POST" | "PUT" | "DELETE";
    data?: T;
    onSuccess?: (response?: any) => void;
    onError?: (error?: any) => void;
    setLoading?: (state: boolean) => void;
}

export async function handleSubmit<T>({
    url,
    method = "POST",
    data,
    onSuccess,
    onError,
    setLoading,
}: HandleSubmitOptions<T>) {
    try {
        setLoading?.(true);

        const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;

        if (!serverDomain) throw new Error("Server domain is not defined in the environment variables.")

        const res = await fetch(`${serverDomain}${url}`, {
            method,
            headers: { "Content-Type": "application/json" },
            body: method === "DELETE" ? undefined : JSON.stringify(data),
        });

        let result: any;
        try {
            result = await res.json();
        } catch {
            result = null;
        }

        if (!res.ok) {
            const message = result?.error || result?.message || res.statusText || "Request failed";
            throw new Error(message);
        }


        onSuccess?.(result);
        return result;
    } catch (err: any) {
        console.error(err);
        onError?.(err.message || "Something went wrong");
    } finally {
        setLoading?.(false);
    }
}

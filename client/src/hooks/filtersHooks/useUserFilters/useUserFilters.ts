import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { UserFilters } from "../../../types/user";



export default function useUserFilters() {

    const [searchParams, setSearchParams] = useSearchParams()
    const status = searchParams.getAll("status") as UserFilters["status"]
    const role = searchParams.getAll("role") as UserFilters["role"]
    const name = searchParams.get("name") as UserFilters["name"]


    const setFilters = useCallback((newFilters: UserFilters) => {
        setSearchParams(() => {
            const params = searchParams

            if (newFilters.status !== undefined) {
                params.delete("status");
                newFilters.status.forEach((s) => params.append("status", s));
            }

            if (newFilters.role !== undefined) {
                params.delete("role");
                newFilters.role.forEach((r) => params.append("role", r));
            }

            if (newFilters.name !== undefined) {
                if (newFilters.name === "") {
                    params.delete("name");
                } else {
                    params.set("name", newFilters.name);
                }
            }

            return params;
        });
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({ status: [], role: [] })
    }, [])

    return {
        status,
        role,
        name,
        setFilters,
        clearFilters
    }
}
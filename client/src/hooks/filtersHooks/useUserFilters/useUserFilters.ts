import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { UserFilters } from "../../../types/user";



export default function useUserFilters() {

    const [searchParams, setSearchParams] = useSearchParams()
    const status = searchParams.getAll("status") as UserFilters["status"]
    const role = searchParams.getAll("role") as UserFilters["role"]
    const name = searchParams.get("name") as UserFilters["name"]


    const setFilters = useCallback((filters: UserFilters) => {
        setSearchParams((params) => {
            if (filters.status !== undefined) {
                params.delete("status")
                filters.status.forEach(s => params.append("status", s))
            }
            if (filters.role !== undefined) {
                params.delete("role")
                filters.role.forEach((r) => params.append("role", r))
            }
            if (filters.name) {
                params.set("name", filters.name)
            }
            return params
        })

    }, [])

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
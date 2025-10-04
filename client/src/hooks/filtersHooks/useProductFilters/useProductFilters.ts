import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { ProductFilters } from "../../../types/product";


export default function useProductFilters() {

    const [searchParams, setSearchParams] = useSearchParams()
    const name = searchParams.get("name") as ProductFilters["name"]
    const pageStr = searchParams.get("page");
    const page: ProductFilters["page"] = pageStr ? Number(pageStr) || 1 : 1;

    const setFilters = useCallback((newFilters: ProductFilters) => {
        setSearchParams(() => {
            const params = searchParams

            if (newFilters.name !== undefined) {
                if (newFilters.name === "") {
                    params.delete("name");
                } else {
                    params.set("name", newFilters.name);
                }
            }
            if (newFilters.page === undefined) {
                params.set("page", "1")

            } else {
                params.set("page", String(newFilters.page))
            }

            return params;
        });
    }, []);

    return {
        name,
        page,
        setFilters,
    }
}
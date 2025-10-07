import { ChevronLeft, ChevronRight } from "lucide-react";
import { ActionButtons } from "../../components/ActionButtons"
import type { FC } from "react";
import useFilters from "../../hooks/useFilters/useFilters";
import { memo } from "react"

interface PaginationProps {
    limit: number | undefined;
    total: number | undefined;
    totalPages: number | undefined;
    currentPage: number | undefined;
}

const Pagination: FC<PaginationProps> = ({ currentPage, total, limit, totalPages }) => {

    const { setFilters, get } = useFilters()
    const page = get("page", "number")



    if (total === undefined || limit === undefined || totalPages === undefined || currentPage === undefined) {
        return
    }

    const handlePageChange = (p: number) => {
        if (p < 1) return
        if (p > totalPages) return
        setFilters({ page: p })
    }

    return (
        <div className="flex justify-between mt-[20px]">
            <p className="text-sm text-midgray">
                showing {total ? 1 + limit * (currentPage - 1) : 0}-{Math.min(limit * currentPage, total)} of {total}
            </p>
            <ActionButtons>
                <ActionButtons.Button
                    type="icon"
                    Icon={ChevronLeft}
                    onClick={() => handlePageChange(page ? page - 1 : 1)}
                    disabled={page === 1}
                />
                <ActionButtons.Button
                    type="icon"
                    Icon={ChevronRight}
                    onClick={() =>
                        handlePageChange(page ? page + 1 : 1)}
                    disabled={page === totalPages || total === 0}
                />
            </ActionButtons>
        </div>
    )
}

export default memo(Pagination)
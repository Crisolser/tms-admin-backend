export const createPagination = (limit, page, totalPages, totalRecords) => {
    return {
        total_records: totalRecords,
        total_pages: totalPages,
        current_page: page || 1,
        per_page: limit || 10,
        has_next_page: page < totalPages,
        has_previous_page: page > 1,
    };
};
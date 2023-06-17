import React from "react";
import { Pagination } from "react-bootstrap";

const Pages = ({ totalPages, currentPage, handlePageChange }) => {
    const pageNumbers = [];

    if (totalPages <= 1) return null;

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    pageNumbers.push(
        <Pagination.First key="first" disabled={isFirstPage} onClick={() => handlePageChange(1)} />,

        <Pagination.Item key={1} active={currentPage === 1} onClick={() => handlePageChange(1)}>
            {1}
        </Pagination.Item>
    );

    if (!isFirstPage && currentPage >= 4) {
        pageNumbers.push(<Pagination.Ellipsis key="ellipsis1" />);
    }

    // Generate page numbers before and after the current page
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
            pageNumbers.push(
                <Pagination.Item
                    key={i}
                    active={currentPage === i}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }
    }

    if (!isLastPage && currentPage <= totalPages - 3) {
        pageNumbers.push(<Pagination.Ellipsis key="ellipsis2" />);
    }

    if (totalPages > 1) {
        pageNumbers.push(
            <Pagination.Item
                key={totalPages}
                active={currentPage === totalPages}
                onClick={() => handlePageChange(totalPages)}
            >
                {totalPages}
            </Pagination.Item>
        );
    }

    pageNumbers.push(
        <Pagination.Last
            key="last"
            disabled={isLastPage}
            onClick={() => handlePageChange(totalPages)}
        />
    );

    return <Pagination className="pagination">{pageNumbers}</Pagination>;
};

export default Pages;

import React from 'react';

interface ProductCatalogueFooterProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    isGuest: boolean;
}

const ProductCatalogueFooter: React.FC<ProductCatalogueFooterProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    onItemsPerPageChange,
    isGuest
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newItemsPerPage = parseInt(event.target.value, 10);
        onItemsPerPageChange(newItemsPerPage);
    };

    return (
        <div className="product-catalogue-footer">
            <div className="product-catalogue-footer-pagination">
                <div className="product-catalogue-footer-pagination-buttons">
                    <button
                        className="product-catalogue-footer-pagination-button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span className="pagination-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="product-catalogue-footer-pagination-button"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalItems === 0}
                    >
                        Next
                    </button>
                </div>
                <div className="items-per-page">
                    <span>Items per page: </span>
                    <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
            <div className="product-catalogue-footer-user-info">
                {
                    isGuest ? 'Logged in as Guest' : 'Logged in as User'
                }
            </div>
        </div>
    );
};

export default ProductCatalogueFooter;

import { FC } from 'react';

interface ProductCatalogueFooterProps {
    totalItems: number;
    itemsPerPage?: number;
    currentPage?: number;
    onPageChange: (pageNumber: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

const ProductCatalogueFooter: FC<ProductCatalogueFooterProps> = ({ 
    totalItems, 
    itemsPerPage = 20, 
    currentPage = 1, 
    onPageChange, 
    onItemsPerPageChange 
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        onPageChange(pageNumber);
    };

    return (
        <div className="product-catalogue-footer">
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
            <div className="items-per-page">
                <span>Items per page:</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => {
                        onItemsPerPageChange(parseInt(e.target.value, 10));
                        onPageChange(1); // Reset to page 1 when changing items per page
                    }}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    {/* Add more options as needed */}
                </select>
            </div>
        </div>
    );
};

export default ProductCatalogueFooter;
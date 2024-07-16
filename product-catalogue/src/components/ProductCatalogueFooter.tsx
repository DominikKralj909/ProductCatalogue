import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../types/types';

interface ProductCatalogueFooterProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    isGuest: boolean;
    basket: Set<Product>;
}

const ProductCatalogueFooter: React.FC<ProductCatalogueFooterProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    onItemsPerPageChange,
    isGuest,
    basket
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
                { isGuest ? 'Logged in as Guest' : 'Logged in as User' }
                <div className="basket-icon" title="Basket Details on Hover">
                    <FontAwesomeIcon icon={faShoppingBasket} size="lg" />
                    <div className="basket-details">
                       {basket.size > 0 ? 
                            Array.from(basket).map(product => (
                                <div key={product.id}>
                                    <p>Title: {product.title}</p>
                                    <p>Price: ${product.price.toFixed(2)}</p>
                                </div>
                            )) : 'Your Basket is empty'
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCatalogueFooter;

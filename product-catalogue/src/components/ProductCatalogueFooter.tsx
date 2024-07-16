import React, { useCallback, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../types/types';
import { usePopper } from 'react-popper';

interface ProductCatalogueFooterProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    isGuest: boolean;
    basket: Set<Product>;
}

function ProductCatalogueFooter({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    onItemsPerPageChange,
    isGuest,
    basket
}: ProductCatalogueFooterProps) {
    const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [itemsPerPage, totalItems]);

    const [popperVisible, setPopperVisible] = useState(false);
    const [popperReferenceElement, setPopperReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperPopperElement, setPopperPopperElement] = useState<HTMLDivElement | null>(null);

    const handlePageChange = useCallback((pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    }, [onPageChange, totalPages]);

    const handleItemsPerPageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const newItemsPerPage = parseInt(event.target.value, 10);
        onItemsPerPageChange(newItemsPerPage);
    }, [onItemsPerPageChange]);


    const { styles, attributes } = usePopper(popperReferenceElement, popperPopperElement, {
        placement: 'bottom-start',
    });

    const togglePopper = () => {
        setPopperVisible(!popperVisible);
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
                {isGuest ? 'Logged in as Guest' : 'Logged in as User'}
                <div
                    className="basket-icon"
                    title="Basket Details on Hover"
                    ref={setPopperReferenceElement}
                    onMouseEnter={togglePopper}
                    onMouseLeave={togglePopper}
                >
                    <FontAwesomeIcon icon={faShoppingBasket} size="lg" />
                    {popperVisible && (
                        <div
                            className="basket-details popper"
                            ref={setPopperPopperElement}
                            style={{ ...styles.popper, zIndex: 100, maxHeight: '300px', overflowY: 'auto' }}
                            {...attributes.popper}
                        >
                            {basket.size > 0 ? (
                                <div className="basket-item-list">
                                    {Array.from(basket).map((product, index) => (
                                        <div key={product.id} className="basket-item">
                                            <p className="basket-item-title">{product.title}</p>
                                            <p className="basket-item-price">Price: ${product.price.toFixed(2)}</p>
                                            {index !== basket.size - 1 && <hr className="item-divider" />}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                'Your Basket is empty'
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCatalogueFooter;

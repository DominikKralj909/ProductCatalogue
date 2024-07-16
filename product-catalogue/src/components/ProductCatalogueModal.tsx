import { useMemo, useCallback } from 'react';

import { Product } from '../types/types';

interface ProductCatalogueModalProps {
    product: Product;
    showModal: boolean;
    onClose: () => void;
}

function ProductCatalogueModal({ product, showModal, onClose }: ProductCatalogueModalProps) {
    const { title, description, reviews, tags } = useMemo(() => product, [product]);

    const handleCloseModal = useCallback(() => {
        onClose();
    }, [onClose]);

    if (!showModal) return null;

    return (
        <div className="product-catalogue-modal-overlay">
            <div className="product-catalogue-modal">
                <div className="product-catalogue-modal-header">
                    <h2>{title}</h2>
                    <button className="product-catalogue-modal-close-button" onClick={handleCloseModal}>
                        &times;
                    </button>
                </div>
                <div className="product-catalogue-modal-description">
                    {description}
                </div>
                <h2>Reviews</h2>
                <ul className="product-catalogue-modal-reviews-list">
                    {reviews.map((review, index) => (
                        <li key={index}>
                            <strong>{review.reviewerName}</strong>: {review.comment}
                        </li>
                    ))}
                </ul>
                <h2>Tags</h2>
                <ul className="product-catalogue-modal-tags-list">
                    {tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProductCatalogueModal;

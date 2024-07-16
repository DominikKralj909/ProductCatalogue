import { useState, useMemo, useCallback } from 'react';
import classNames from 'classnames';

import { Product } from '../types/types';
import ProductCatalogueModal from './ProductCatalogueModal';

interface ProductCatalogueRowProps {
    product: Product;
    onAddToBasket: (product: Product) => void;
    onRemoveFromBasket: (product: Product) => void;
    isProductInBasket: (product: Product) => boolean;
}

function ProductCatalogueRow({ product, onAddToBasket, onRemoveFromBasket, isProductInBasket }: ProductCatalogueRowProps) {
    const { images, description, price, title } = product;

    const [showModal, setShowModal] = useState(false);

    const concatDescription = useMemo(() => description.length > 100, [description]);

    const rowCellClasses = useMemo(() => classNames('product-catalogue-row-cell', {
        'product-catalogue-row-cell-concat': concatDescription,
    }), [concatDescription]);

    const handleModalToggle = useCallback(() => {
        setShowModal(prevShowModal => !prevShowModal);
    }, []);

    const handleCheckboxChange = useCallback(() => {
        if (isProductInBasket(product)) {
            onRemoveFromBasket(product);
        } else {
            onAddToBasket(product);
        }
    }, [product, isProductInBasket, onAddToBasket, onRemoveFromBasket]);

    return (
        <div className="product-catalogue-row">
            <a href={images.join('')} target="_blank" className={classNames(rowCellClasses, "product-catalogue-row-cell-concat")}>
                {images}
            </a>
            <div className={rowCellClasses}>{title}</div>
            <div className={rowCellClasses}>{price}</div>
            <div className={classNames(rowCellClasses, "product-catalogue-row-cell-details")}>
                {concatDescription ? `${description.slice(0, 100)}...` : description}
            </div>
            <div className={rowCellClasses}>
                <button className="details-button" onClick={handleModalToggle}>Details</button>
            </div>
            <div className={rowCellClasses}>
                <input
                    type="checkbox"
                    checked={isProductInBasket(product)}
                    onChange={handleCheckboxChange}
                />
            </div>
            <ProductCatalogueModal
                product={product}
                showModal={showModal}
                onClose={handleModalToggle}
            />
        </div>
    );
}

export default ProductCatalogueRow;

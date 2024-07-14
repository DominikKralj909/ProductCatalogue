import { useState, FC } from 'react';

import classNames from 'classnames';

import { Product } from '../types/types';

import ProductCatalogueModal from './ProductCatalogueModal';

interface ProductCatalogueRowProps {
    product: Product;
}

const ProductCatalogueRow: FC<ProductCatalogueRowProps> = ({ product }) => {
    const { images, description, price, title } = product;
    const [showModal, setShowModal] = useState(false);

    const concatDescription = description.length > 100;


    const rowCellClasses = classNames("product-catalogue-row-cell", {
        "product-catalogue-row-cell-concat": concatDescription,
    });

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

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
            <ProductCatalogueModal
                product={product}
                showModal={showModal}
                onClose={handleModalToggle}
            />
        </div>
    );
};

export default ProductCatalogueRow;

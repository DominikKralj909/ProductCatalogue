import React, { useState, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faSortAmountUp, faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';

import { Columns } from '../types/types';

interface ProductCatalogueHeaderProps {
    columns: Columns[];
    onSortPrice: () => void;
    onSortTitle: () => void;
}

const ProductCatalogueHeader: React.FC<ProductCatalogueHeaderProps> = ({ columns, onSortPrice, onSortTitle }) => {
    const [priceSortDirection, setPriceSortDirection] = useState<'asc' | 'desc' | ''>('');
    const [titleSortDirection, setTitleSortDirection] = useState<'asc' | 'desc' | ''>('');

    const handleSortPrice = useCallback(() => {
        if (priceSortDirection === 'asc') {
            setPriceSortDirection('desc');
        } else {
            setPriceSortDirection('asc');
        }
        onSortPrice();
    }, [priceSortDirection, setPriceSortDirection, onSortPrice]);

    const handleSortTitle = useCallback(() => {
        if (titleSortDirection === 'asc') {
            setTitleSortDirection('desc');
        } else {
            setTitleSortDirection('asc');
        }
        onSortTitle();
    }, [titleSortDirection, setTitleSortDirection, onSortTitle]);

    const sortedColumns = React.useMemo(() => {
        return columns.map(({ key, label }) => {
            return (
                <div className="product-catalogue-header-cell" key={key}>
                    {label}
                    {key === 'price' && (
                        <button className="sort-button" onClick={handleSortPrice}>
                            {priceSortDirection === 'asc' ? (
                                <FontAwesomeIcon icon={faSortAmountUp} title="Sort Ascending" />
                            ) : (
                                <FontAwesomeIcon icon={faSortAmountDown} title="Sort Descending" />
                            )}
                        </button>
                    )}
                    {key === 'title' && (
                        <button className="sort-button" onClick={handleSortTitle}>
                            {titleSortDirection === 'asc' ? (
                                <FontAwesomeIcon icon={faSortAlphaUp} title="Sort A-Z" />
                            ) : (
                                <FontAwesomeIcon icon={faSortAlphaDown} title="Sort Z-A" />
                            )}
                        </button>
                    )}
                </div>
            );
        });
    }, [columns, priceSortDirection, titleSortDirection, handleSortPrice, handleSortTitle]);

    return (
        <div className="product-catalogue-header">
            {sortedColumns}
            <div className="product-catalogue-header-cell">
                Add to basket
            </div>
        </div>
    );
};

export default ProductCatalogueHeader;

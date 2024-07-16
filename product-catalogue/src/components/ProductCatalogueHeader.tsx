import React, { useState } from 'react';
import { Columns } from '../types/types';

interface ProductCatalogueHeaderProps {
    columns: Columns[];
    onSortPrice: () => void;
    onSortTitle: () => void;
}

const ProductCatalogueHeader: React.FC<ProductCatalogueHeaderProps> = ({ columns, onSortPrice, onSortTitle }) => {
    const [priceSortDirection, setPriceSortDirection] = useState<'asc' | 'desc' | ''>('');
    const [titleSortDirection, setTitleSortDirection] = useState<'asc' | 'desc' | ''>('');

    const handleSortPrice = () => {
        if (priceSortDirection === 'asc') {
            setPriceSortDirection('desc');
        } else {
            setPriceSortDirection('asc');
        }
        onSortPrice();
    };

    const handleSortTitle = () => {
        if (titleSortDirection === 'asc') {
            setTitleSortDirection('desc');
        } else {
            setTitleSortDirection('asc');
        }
        onSortTitle();
    };

    return (
        <div className="product-catalogue-header">
            {columns.map(({ key, label }) => {
                return (
                    <div className="product-catalogue-header-cell" key={key}>
                        {label}
                        {key === 'price' && (
                            <button className="sort-button" onClick={handleSortPrice}>
                                {priceSortDirection === 'asc' ? '▲' : '▼'}
                            </button>
                        )}
                        {key === 'title' && (
                            <button className="sort-button" onClick={handleSortTitle}>
                                {titleSortDirection === 'asc' ? 'A-Z' : 'Z-A'}
                            </button>
                        )}
                    </div>
                );
            })}
            <div className="product-catalogue-header-cell">
                Add to basket
            </div>
        </div>
    );
};

export default ProductCatalogueHeader;

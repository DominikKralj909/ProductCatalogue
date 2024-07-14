import React from 'react';
import { PriceRangeFilter, Product } from '../types/types';
import ProductCatalogueRow from './ProductCatalogueRow';

interface ProductCatalogBodyProps {
    products: Product[];
    selectedCategory: string;
    selectedPriceRange: string;
    categoryFilter?: string[] | null;
    priceRangeFilter?: PriceRangeFilter[];
    onCategoryChange: (category: string) => void;
    onPriceRangeChange: (priceRange: string) => void;
    onTitleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // New prop
    titleFilter: string; // New prop
    priceSortDirection: '' | 'asc' | 'desc';
    titleSortDirection: '' | 'asc' | 'desc';
}

const ProductCatalogueBody: React.FC<ProductCatalogBodyProps> = ({
    products,
    selectedCategory,
    selectedPriceRange,
    categoryFilter,
    priceRangeFilter,
    onCategoryChange,
    onPriceRangeChange,
    onTitleFilterChange, 
    titleFilter,

}) => {
    return (
        <div className="product-catalogue-body">
            {(categoryFilter || priceRangeFilter) && (
                <div className="product-catalogue-filters">
                    {categoryFilter && (
                        <div className="product-catalogue-filter-wrapper">
                            <label htmlFor="category">Categories: </label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={e => onCategoryChange(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categoryFilter.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {priceRangeFilter && (
                        <div className="product-catalogue-filter-wrapper">
                            <label htmlFor="price">Price ranges: </label>
                            <select
                                id="price"
                                value={selectedPriceRange}
                                onChange={e => onPriceRangeChange(e.target.value)}
                            >
                                <option value="">Select Price Range</option>
                                {priceRangeFilter.map((range, index) => (
                                    <option
                                        key={index}
                                        value={`${range.min ?? ''}-${range.max ?? ''}`}
                                    >
                                        {`${range.min ?? ''} - ${range.max ?? ''}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="product-catalogue-filter-wrapper">
                        <label htmlFor="title">Filter by Title: </label>
                        <input
                            type="text"
                            id="title"
                            value={titleFilter} // Use the title filter state
                            onChange={onTitleFilterChange} // Use the title filter change handler
                            placeholder="Enter title"
                        />
                    </div>
                </div>
            )}

            {products.length === 0 ? (
                <p className="no-products-message">No products match your filter criteria.</p>
            ) : (
                products.map((product: Product) => (
                    <ProductCatalogueRow key={product.id} product={product} />
                ))
            )}
        </div>
    );
};

export default ProductCatalogueBody;

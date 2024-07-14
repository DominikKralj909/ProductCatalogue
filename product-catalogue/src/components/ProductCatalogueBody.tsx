import React, { useMemo, useState } from 'react';
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
    priceSortDirection,
    titleSortDirection,
}) => {
    const [titleFilter, setTitleFilter] = useState<string>('');

    const filteredProducts = useMemo(() => {
        const filtered = products.filter(product => {
            const categoryMatches = !selectedCategory || selectedCategory === '' || product.category.toLowerCase() === selectedCategory.toLowerCase();

            let priceMatches = true;

            if (selectedPriceRange && selectedPriceRange !== '') {
                const [minPrice, maxPrice] = selectedPriceRange.split('-').map(value => parseFloat(value.trim()));

                priceMatches = product.price >= minPrice && (maxPrice ? product.price <= maxPrice : true);
            }

            const titleIncludes = !titleFilter || titleFilter === '' || product.title.toLowerCase().includes(titleFilter.toLowerCase());

            return categoryMatches && priceMatches && titleIncludes;
        });

        filtered.sort((a, b) => {
            if (priceSortDirection !== '' && titleSortDirection === '') {
                if (priceSortDirection === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            } else if (titleSortDirection !== '' && priceSortDirection === '') {
                if (titleSortDirection === 'asc') {
                    return a.title.localeCompare(b.title);
                } else {
                    return b.title.localeCompare(a.title);
                }
            } else {
                return 0;
            }
        });

        return filtered;
    }, [products, selectedCategory, selectedPriceRange, priceSortDirection, titleSortDirection, titleFilter]);

    const handleTitleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleFilter(event.target.value);
    };

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
                            value={titleFilter}
                            onChange={handleTitleFilterChange}
                            placeholder="Enter title"
                        />
                    </div>
                </div>
            )}

            {filteredProducts.length === 0 ? (
                <p className="no-products-message">No products match your filter criteria.</p>
            ) : (
                filteredProducts.map((product: Product) => (
                    <ProductCatalogueRow key={product.id} product={product} />
                ))
            )}
        </div>
    );
};

export default ProductCatalogueBody;

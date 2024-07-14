import React, { useState } from 'react';
import { Columns, PriceRangeFilter, Product } from '../types/types';
import ProductCatalogueBody from './ProductCatalogueBody';
import ProductCatalogueHeader from './ProductCatalogueHeader';
import ProductCatalogueFooter from './ProductCatalogueFooter';

interface ProductCatalogueProps {
    columns: Columns[];
    rows: Product[];
    categoryFilter?: string[] | null;
    priceRangeFilter?: PriceRangeFilter[];
}

const ProductCatalogue: React.FC<ProductCatalogueProps> = ({ columns, rows, categoryFilter, priceRangeFilter }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
    const [priceSortDirection, setPriceSortDirection] = useState<'' | 'asc' | 'desc'>('');
    const [titleSortDirection, setTitleSortDirection] = useState<'' | 'asc' | 'desc'>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(20); // Default items per page

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handlePriceRangeChange = (priceRange: string) => {
        setSelectedPriceRange(priceRange);
    };

    const handleSortPrice = () => {
        if (priceSortDirection === 'asc') {
            setPriceSortDirection('desc');
        } else {
            setPriceSortDirection('asc');
        }
        setTitleSortDirection('');
    };

    const handleSortTitle = () => {
        if (titleSortDirection === 'asc') {
            setTitleSortDirection('desc');
        } else {
            setTitleSortDirection('asc');
        }
        setPriceSortDirection('');
    };

    // Function to handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Calculate paginated rows based on currentPage and itemsPerPage
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedRows = rows.slice(startIndex, endIndex);

    return (
        <div className="product-catalogue">
            <div className="product-catalogue-filters">
                <ProductCatalogueHeader
                    columns={columns}
                    onSortPrice={handleSortPrice}
                    onSortTitle={handleSortTitle}
                />
                <ProductCatalogueBody
                    products={paginatedRows}
                    selectedCategory={selectedCategory}
                    selectedPriceRange={selectedPriceRange}
                    categoryFilter={categoryFilter}
                    priceRangeFilter={priceRangeFilter}
                    onCategoryChange={handleCategoryChange}
                    onPriceRangeChange={handlePriceRangeChange}
                    priceSortDirection={priceSortDirection}
                    titleSortDirection={titleSortDirection}
                />
                <ProductCatalogueFooter
                    totalItems={rows.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={setItemsPerPage}
                />
            </div>
        </div>
    );
};

export default ProductCatalogue;

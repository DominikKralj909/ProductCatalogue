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
        setCurrentPage(1); // Reset to page 1 when category changes
    };

    const handlePriceRangeChange = (priceRange: string) => {
        setSelectedPriceRange(priceRange);
        setCurrentPage(1); // Reset to page 1 when price range changes
    };

    const handleSortPrice = () => {
        if (priceSortDirection === 'asc') {
            setPriceSortDirection('desc');
        } else {
            setPriceSortDirection('asc');
        }
        setTitleSortDirection('');
        setCurrentPage(1);
    };

    const handleSortTitle = () => {
        if (titleSortDirection === 'asc') {
            setTitleSortDirection('desc');
        } else {
            setTitleSortDirection('asc');
        }
        setPriceSortDirection('');
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

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

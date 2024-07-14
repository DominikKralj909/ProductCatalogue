import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    }, []);

    const handlePriceRangeChange = useCallback((priceRange: string) => {
        setSelectedPriceRange(priceRange);
        setCurrentPage(1); 
    }, []);

    const handleSortPrice = useCallback( () => {
        if (priceSortDirection === 'asc') {
            setPriceSortDirection('desc');
        } else {
            setPriceSortDirection('asc');
        }
        setTitleSortDirection('');
        setCurrentPage(1);
    }, [priceSortDirection]);

    const handleSortTitle = useCallback(() => {
        if (titleSortDirection === 'asc') {
            setTitleSortDirection('desc');
        } else {
            setTitleSortDirection('asc');
        }
        setPriceSortDirection('');
        setCurrentPage(1);
    }, [titleSortDirection]);

    const handlePageChange = useCallback((pageNumber: number) => {
        setCurrentPage(pageNumber);
    }, []);

   
    const filteredProducts = useMemo(() => {
        return rows.filter(product => {
            const categoryMatches = !selectedCategory || selectedCategory === '' || product.category.toLowerCase() === selectedCategory.toLowerCase();
            let priceMatches = true;

            if (selectedPriceRange && selectedPriceRange !== '') {
                const [minPrice, maxPrice] = selectedPriceRange.split('-').map(value => parseFloat(value.trim()));
                priceMatches = product.price >= minPrice && (maxPrice ? product.price <= maxPrice : true);
            }

            return categoryMatches && priceMatches;
        }).sort((a, b) => {
            if (priceSortDirection !== '' && titleSortDirection === '') {
                return priceSortDirection === 'asc' ? a.price - b.price : b.price - a.price;
            } else if (titleSortDirection !== '' && priceSortDirection === '') {
                return titleSortDirection === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            } else {
                return 0;
            }
        });
    }, [rows, selectedCategory, selectedPriceRange, priceSortDirection, titleSortDirection]);

   
    const paginatedRows = useMemo(() => {
        if (filteredProducts.length <= itemsPerPage) {
            return filteredProducts;
        } else {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return filteredProducts.slice(startIndex, endIndex);
        }
    }, [filteredProducts, currentPage, itemsPerPage]);

    useEffect(() => {
        if (filteredProducts.length <= itemsPerPage) {
            setCurrentPage(1);
        }
    }, [filteredProducts, itemsPerPage]);

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
                    totalItems={filteredProducts.length}
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

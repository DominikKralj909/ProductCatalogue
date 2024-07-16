import { useState, useEffect, useMemo, useCallback } from 'react';

import { Columns, PriceRangeFilter, Product } from '../types/types';

import ProductCatalogueBody from './ProductCatalogueBody';
import ProductCatalogueHeader from './ProductCatalogueHeader';
import ProductCatalogueFooter from './ProductCatalogueFooter';

interface ProductCatalogueProps {
    columns: Columns[];
    rows: Product[];
    categoryFilter?: string[] | null;
    priceRangeFilter?: PriceRangeFilter[];
    isGuest: boolean;
}

function ProductCatalogue({ columns, rows, categoryFilter, priceRangeFilter, isGuest: isGuestProp }: ProductCatalogueProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
    const [priceSortDirection, setPriceSortDirection] = useState<'' | 'asc' | 'desc'>('');
    const [titleSortDirection, setTitleSortDirection] = useState<'' | 'asc' | 'desc'>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(20);
    const [titleFilter, setTitleFilter] = useState<string>('');
    const [isGuest, setIsGuest] = useState<boolean>(isGuestProp);
    const [basket, setBasket] = useState<Set<Product>>(new Set());

    useEffect(() => {
        const guestStatus = localStorage.getItem('isGuest');
        setIsGuest(guestStatus === 'true');
    }, []);

    useEffect(() => {
        const savedBasket = localStorage.getItem('basket');
        if (savedBasket) {
            setBasket(new Set(JSON.parse(savedBasket)));
        }
    }, []);

    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    }, []);

    const handlePriceRangeChange = useCallback((priceRange: string) => {
        setSelectedPriceRange(priceRange);
        setCurrentPage(1);
    }, []);

    const handleSortPrice = useCallback(() => {
        setPriceSortDirection(priceSortDirection === 'asc' ? 'desc' : 'asc');
        setTitleSortDirection('');
        setCurrentPage(1);
    }, [priceSortDirection]);

    const handleSortTitle = useCallback(() => {
        setTitleSortDirection(titleSortDirection === 'asc' ? 'desc' : 'asc');
        setPriceSortDirection('');
        setCurrentPage(1);
    }, [titleSortDirection]);

    const handlePageChange = useCallback((pageNumber: number) => {
        setCurrentPage(pageNumber);
    }, []);

    const handleTitleFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleFilter(event.target.value);
        setCurrentPage(1);
    }, []);

    const handleAddToBasket = useCallback((product: Product) => {
        setBasket((prevBasket: Set<Product>) => {
            const updatedBasket = new Set(prevBasket);

            updatedBasket.add(product);
            localStorage.setItem('basket', JSON.stringify(Array.from(updatedBasket)));

            return updatedBasket;
        });
    }, []);

    const handleRemoveFromBasket = useCallback((product: Product) => {
        setBasket((prevBasket: Set<Product>) => {
            const updatedBasket = new Set(prevBasket);

            updatedBasket.delete(product);
            localStorage.setItem('basket', JSON.stringify(Array.from(updatedBasket)));

            return updatedBasket;
        });
    }, []);

    const isProductInBasket = useCallback((product: Product) => basket.has(product), [basket]);

    const filteredProducts = useMemo(() => {
        return rows.filter(product => {
            const categoryMatches = !selectedCategory || selectedCategory === '' || product.category.toLowerCase() === selectedCategory.toLowerCase();
            let priceMatches = true;

            if (selectedPriceRange && selectedPriceRange !== '') {
                const [minPrice, maxPrice] = selectedPriceRange.split('-').map(value => parseFloat(value.trim()));
                priceMatches = product.price >= minPrice && (maxPrice ? product.price <= maxPrice : true);
            }

            const titleMatches = !titleFilter || product.title.toLowerCase().includes(titleFilter.toLowerCase());

            return categoryMatches && priceMatches && titleMatches;
        }).sort((a, b) => {
            if (priceSortDirection !== '' && titleSortDirection === '') {
                return priceSortDirection === 'asc' ? a.price - b.price : b.price - a.price;
            } else if (titleSortDirection !== '' && priceSortDirection === '') {
                return titleSortDirection === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            } else {
                return 0;
            }
        });
    }, [rows, selectedCategory, selectedPriceRange, priceSortDirection, titleSortDirection, titleFilter]);

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
                    onTitleFilterChange={handleTitleFilterChange}
                    titleFilter={titleFilter}
                    priceSortDirection={priceSortDirection}
                    titleSortDirection={titleSortDirection}
                    onAddToBasket={handleAddToBasket}
                    onRemoveFromBasket={handleRemoveFromBasket}
                    isProductInBasket={isProductInBasket}
                />
                <ProductCatalogueFooter
                    totalItems={filteredProducts.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={setItemsPerPage}
                    isGuest={isGuest}
                    basket={basket}
                />
            </div>
        </div>
    );
}

export default ProductCatalogue;

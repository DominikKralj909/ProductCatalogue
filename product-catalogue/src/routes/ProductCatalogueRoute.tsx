import { useMemo, useEffect, useState, CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getProducts } from '../api/api'; 
import { Product } from '../types/types';
import ProductCatalogue from '../components/ProductCatalogue';

function ProductCatalogueRoute() {
    const location = useLocation();
    const isGuest = location.state?.isGuest || false;

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const spinnerStyles: CSSProperties = { display: 'block', margin: '0 auto' };

    const columns = useMemo(() => (
        [
            { key: 'image', label: 'Image' }, 
            { key: 'title', label: 'Title' }, 
            { key: 'price', label: 'Price' }, 
            { key: 'decription', label: 'Descirption' }, 
            { key: 'show-details', label: 'Show Details' },
        ]
    ), []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.products);
            } catch (error) {
                setError('Failed to fetch products');
            } finally {
                // Simulating loading delay
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        };

        fetchProducts();
    }, []);

    const priceRanges = useMemo(() => [
        { min: 0, max: 10 },
        { min: 10, max: 50 },
        { min: 50, max: 100 },
        { min: 100, max: null },
    ], []);

    return (
        <div className="product-catalogue-wrapper">
            {loading && (
                <ClipLoader 
                    size={150} 
                    color="#123abc" 
                    loading={loading}
                    aria-label="Loading Products" 
                    cssOverride={spinnerStyles}
                />
            )}
            {error && <div>{error}</div>}
            {!loading && !error && (
                <ProductCatalogue 
                    columns={columns} 
                    rows={products}
                    categoryFilter={["Furniture", "Fragrances", 'Beauty']}
                    priceRangeFilter={priceRanges}
                    isGuest={isGuest} 
                />
            )}
        </div>
    );
}

export default ProductCatalogueRoute;

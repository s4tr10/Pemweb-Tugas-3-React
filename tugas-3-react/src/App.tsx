import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { AppLayout } from './layouts/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { SettingsPage } from './pages/SettingsPage';
import type { Product, ViewMode } from './types/product';
import {
  loadProducts,
  loadViewMode,
  saveProducts,
  saveViewMode,
} from './utils/storage';

export default function App() {
  const [products, setProducts] = useState<Product[]>(loadProducts);
  const [viewMode, setViewMode] = useState<ViewMode>(loadViewMode);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  useEffect(() => {
    saveViewMode(viewMode);
  }, [viewMode]);

  function handleCreateProduct(data: { name: string; price: number }) {
    setProducts((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 1;
      const newProduct: Product = {
        id: nextId,
        name: data.name,
        price: data.price,
      };
      return [...prev, newProduct];
    });
  }

  function handleUpdateProduct(
    id: number,
    data: { name: string; price: number },
  ) {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, name: data.name, price: data.price }
          : item,
      ),
    );
  }

  function handleDeleteProduct(id: number) {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  }

  function handleResetProducts() {
    setProducts(INITIAL_PRODUCTS);
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={<DashboardPage products={products} viewMode={viewMode} />}
        />
        <Route
          path="products"
          element={
            <ProductsPage
              products={products}
              viewMode={viewMode}
              onCreateProduct={handleCreateProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          }
        />
        <Route
          path="products/:id"
          element={
            <ProductDetailPage
              products={products}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          }
        />
        <Route
          path="settings"
          element={
            <SettingsPage
              viewMode={viewMode}
              onChangeViewMode={setViewMode}
              onResetProducts={handleResetProducts}
            />
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

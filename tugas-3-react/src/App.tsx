import { useMemo, useState } from 'react';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import type { Product, ModalType } from './types/product';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ProductList } from './components/ProductList';
import { FooterSummary } from './components/FooterSummary';
import { ProductFormModal } from './components/ProductFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import './App.css';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(trimmed),
    );
  }, [products, searchTerm]);

  function handleOpenCreate() {
    setSelectedProduct(null);
    setModalType('create');
  }

  function handleOpenEdit(product: Product) {
    setSelectedProduct(product);
    setModalType('edit');
  }

  function handleOpenDelete(product: Product) {
    setSelectedProduct(product);
    setModalType('delete');
  }

  function handleCloseModal() {
    setModalType(null);
    setSelectedProduct(null);
  }

  function handleSaveProduct(data: { name: string; price: number }) {
    if (modalType === 'edit' && selectedProduct) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, name: data.name, price: data.price }
            : item,
        ),
      );
    } else if (modalType === 'create') {
      setProducts((prev) => {
        const nextId =
          prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
        const newProduct: Product = {
          id: nextId,
          name: data.name,
          price: data.price,
        };
        return [...prev, newProduct];
      });
    }

    handleCloseModal();
  }

  function handleConfirmDelete() {
    if (!selectedProduct) return;

    setProducts((prev) =>
      prev.filter((item) => item.id !== selectedProduct.id),
    );
    handleCloseModal();
  }

  return (
    <div className="app-container">
      <Header onAddProduct={handleOpenCreate} />

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalCount={filteredProducts.length}
      />

      <main>
        <ProductList
          products={filteredProducts}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </main>

      <FooterSummary
        displayedCount={filteredProducts.length}
        totalCount={products.length}
      />

      {modalType === 'create' && (
        <ProductFormModal
          key="modal-create"
          isOpen={true}
          mode="create"
          product={null}
          onClose={handleCloseModal}
          onSubmit={handleSaveProduct}
        />
      )}

      {modalType === 'edit' && selectedProduct && (
        <ProductFormModal
          key={`modal-edit-${selectedProduct.id}`}
          isOpen={true}
          mode="edit"
          product={selectedProduct}
          onClose={handleCloseModal}
          onSubmit={handleSaveProduct}
        />
      )}

      <DeleteConfirmModal
        isOpen={modalType === 'delete'}
        product={selectedProduct}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
